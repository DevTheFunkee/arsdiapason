import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { ActivatedRoute, Router } from '@angular/router'
import * as _ from 'lodash'
import * as moment from 'moment'

@Component({
    selector: 'app-test-balconi',
    templateUrl: './test-balconi.component.html',
    styleUrls: ['./test-balconi.component.css']
})
export class TestBalconiComponent implements OnInit {

    constructor(private httpService: HttpService, private activedRoute: ActivatedRoute, private router: Router) { }

    idBambino = this.activedRoute.snapshot.paramMap.get("id")
    schede: any = []
    proveSchede: any = []
    bambino: any = null
    currentScheda: any = {}
    tipiScheda: any = {}
    tipiSchedaToSave: any = []
    arrayAnni: any = [5, 6, 7, 8]

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
            },
            (error: any) => { },
            () => { }
        )
    }

    getArrayImages(images: string) {
        return images ? images.split(';') : []
    }

    getChildAge(dataNascita: Date) {
        let monthsTot = moment().diff(dataNascita, 'months')
        let years = Math.floor(monthsTot / 12)
        let months = monthsTot - (years * 12)
        return years + ' anni ' + (months > 0 ? ' e ' + months + ' mesi ' : '')
    }

    showDatiScheda(scheda: any) {
        this.currentScheda = scheda
        if (!this.tipiScheda[scheda.numero]) {
            this.tipiScheda[scheda.numero] = []
            let tipi = _(this.proveSchede).filter(['numeroScheda', scheda.numero]).groupBy('tipo').keys().value()
            for (let i = 0; i < tipi.length; i++) {
                if (tipi[i] === 'null') {
                    let rows = _.filter(this.proveSchede, { 'numeroScheda': scheda.numero })
                    this.tipiScheda[scheda.numero].push({ tipo: null, rows: rows })
                } else {
                    let rows = _.filter(this.proveSchede, { 'numeroScheda': scheda.numero, 'tipo': tipi[i] })
                    this.tipiScheda[scheda.numero].push({ tipo: tipi[i], rows: rows })
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

    checkBefore(rows: any, id: number, scheda: any) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id !== id) {
                rows[i].id < id ? rows[i].checked = true : rows[i].checked = false
            }
        }
        this.provaFinita(scheda)
    }

    provaFinita(scheda: any) {
        let tipi = this.tipiScheda[scheda.numero]
        if (tipi) {
            let rs = true
            for (var tipo in tipi) {
                if (!_.find(tipi[tipo].rows, { 'checked': true })) {
                    rs = false
                    break
                }
            }
            scheda.complete = rs
        }
    }

    allSchedeComplete() {
        let rs = true
        for (let i = 0; i < this.schede.length; i++) {
            if (!this.schede[i].complete) {
                rs = false
                break
            }
        }
        return rs
    }

    saveTest() {
        let relProvaScheda: any = []
        for (let i = 0; i < this.schede.length; i++) {
            let tipi = this.tipiScheda[this.schede[i].numero]
            for (let j = 0; j < tipi.length; j++) {
                for (let z = 0; z < tipi[j].rows.length; z++) {
                    if (tipi[j].rows[z].checked) {
                        relProvaScheda.push({ idBambino: this.idBambino, idProvaScheda: tipi[j].rows[z].id })
                    }
                }
            }
        }
        this.httpService.callPost('saveTest', relProvaScheda).subscribe(
            (data: any) => {
                this.router.navigate(['testResult'])
            },
            (error: any) => { },
            () => { }
        )
    }

}
