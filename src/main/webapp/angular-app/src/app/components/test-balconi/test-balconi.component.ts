import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { ActivatedRoute, Router } from '@angular/router'
import { saveAs } from 'file-saver'
import * as _ from 'lodash'

@Component({
    selector: 'app-test-balconi',
    templateUrl: './test-balconi.component.html',
    styleUrls: ['./test-balconi.component.css']
})
export class TestBalconiComponent implements OnInit {

    constructor(private httpService: HttpService, private activedRoute: ActivatedRoute, private router: Router) { }

    idBambino: string = this.activedRoute.snapshot.paramMap.get("id")
    schede: any = []
    proveSchede: any = []
    relBambinoSchede: any = []
    bambino: any = null
    currentScheda: any = {}
    tipiScheda: any = {}
    arrayAnni: any = [5, 6, 7, 8]
    today: Date = new Date()

    ngOnInit(): void {
        this.getDatiSchede()
    }

    getDatiSchede() {
        let url: string
        if (this.idBambino) {
            url = 'getDatiSchede?idBambino=' + this.idBambino
        } else {
            url = 'getDatiSchede'
        }
        this.httpService.callPost(url, null).subscribe(
            (data: any) => {
                this.bambino = data.bambino
                this.schede = data.schede
                this.proveSchede = data.proveSchede
                this.relBambinoSchede = data.relBambinoSchede
            },
            (error: any) => { },
            () => { }
        )
    }

    showDatiScheda(scheda: any) {
        this.currentScheda = scheda
        if (!this.tipiScheda[scheda.numero]) {
            this.tipiScheda[scheda.numero] = []
            let tipi = _(this.proveSchede).filter(['numeroScheda', scheda.numero]).groupBy('tipo').keys().value()
            for (let i = 0; i < tipi.length; i++) {
                if (tipi[i] === 'null') {
                    let finded = false
                    let rows = _.filter(this.proveSchede, { 'numeroScheda': scheda.numero })
                    for (let j = 0; j < rows.length; j++) {
                        if (!!_.find(this.relBambinoSchede, { 'idProvaScheda': rows[j].id })) {
                            finded = true
                        }
                        rows[j].checked = !!_.find(this.relBambinoSchede, { 'idProvaScheda': rows[j].id })
                    }
                    this.tipiScheda[scheda.numero].push({ tipo: null, rows: rows })
                    if (!finded) {
                        this.tipiScheda[scheda.numero].noResult = true
                    }
                } else {
                    let finded = false
                    let rows = _.filter(this.proveSchede, { 'numeroScheda': scheda.numero, 'tipo': tipi[i] })
                    for (let j = 0; j < rows.length; j++) {
                        if (!!_.find(this.relBambinoSchede, { 'idProvaScheda': rows[j].id })) {
                            finded = true
                        }
                        rows[j].checked = !!_.find(this.relBambinoSchede, { 'idProvaScheda': rows[j].id })
                    }
                    this.tipiScheda[scheda.numero].push({ tipo: tipi[i], rows: rows })
                    if (!finded) {
                        this.tipiScheda[scheda.numero].noResult = true
                    }
                }
            }
        }
    }

    getRowsByAnni(rows: any, anni: number) {
        return _.filter(rows, { 'anni': anni })
    }

    getTableText(rows: any, row: any, idBambino: string) {
        if (idBambino) return row.testo
        let r = _(rows).filter({ 'anni': row.anni }).value()
        for (let i = 0; i < r.length; i++) {
            if (i === 0 && r[i].id === row.id) {
                return row.testo
            } else {
                return 'e/o<br>' + row.testo
            }
        }
    }

    checkBefore(obj: any, id: number, scheda: any) {
        for (let i = 0; i < obj.rows.length; i++) {
            if (obj.rows[i].id !== id) {
                obj.rows[i].id < id ? obj.rows[i].checked = true : obj.rows[i].checked = false
            }
        }
        obj.noResult = false
        this.provaFinita(scheda)
    }

    uncheckAll(obj: any, scheda: any) {
        for (let i = 0; i < obj.rows.length; i++) {
            obj.rows[i].checked = false
        }
        this.provaFinita(scheda)
    }

    provaFinita(scheda: any) {
        let objects = this.tipiScheda[scheda.numero]
        if (objects) {
            let rs = true
            for (var tipo in objects) {
                if (objects[tipo].noResult) {
                    rs = true
                } else if (!_.find(objects[tipo].rows, { 'checked': true })) {
                    rs = false
                    break
                }
            }
            scheda.complete = rs
        }
    }

    allSchedeComplete() {
        let rs = true
        if (!this.bambino || !this.bambino.dataTest) {
            return false
        }
        for (let i = 0; i < this.schede.length; i++) {
            if (!this.schede[i].complete) {
                rs = false
                break
            }
        }
        return rs
    }

    saveTest() {
        if (this.bambino.dataTest && this.allSchedeComplete()) {
            let idsProvaSceda: any = []
            for (let i = 0; i < this.schede.length; i++) {
                let tipi = this.tipiScheda[this.schede[i].numero]
                for (let j = 0; j < tipi.length; j++) {
                    for (let z = 0; z < tipi[j].rows.length; z++) {
                        if (tipi[j].rows[z].checked) {
                            idsProvaSceda.push(tipi[j].rows[z].id)
                        }
                    }
                }
            }
            this.httpService.callPost('saveTest', { idsProvaSceda: idsProvaSceda, bambino: this.bambino }).subscribe(
                (data: any) => {
                    this.router.navigate(['testResult', this.idBambino])
                },
                (error: any) => { },
                () => { }
            )
        }
    }

    getArrayImages(images: string) {
        return images ? images.split(';') : []
    }

    downloadImg(scheda: any) {
        let imgs = this.getArrayImages(scheda.immagini)
        for (var i = 0; i < imgs.length; i++) {
            saveAs('/assets/img/scheda' + scheda.numero + imgs[i] + '.png', 'scheda' + scheda.numero + imgs[i] + '.png');
        }
    }

}
