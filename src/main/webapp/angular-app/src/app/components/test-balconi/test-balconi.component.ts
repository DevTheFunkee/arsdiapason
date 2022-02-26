import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { ActivatedRoute } from '@angular/router'
import * as _ from 'lodash'
import * as moment from 'moment'

@Component({
    selector: 'app-test-balconi',
    templateUrl: './test-balconi.component.html',
    styleUrls: ['./test-balconi.component.css']
})
export class TestBalconiComponent implements OnInit {

    constructor(private httpService: HttpService, private activedRoute: ActivatedRoute) { }

    idBambino = this.activedRoute.snapshot.paramMap.get("id")
    schede: any = []
    proveSchede: any = []
    bambino: any = null
    currentScheda: any = {}
    tipiScheda: any = {}
    rowsScheda: any = []
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

    checkBefore(rows: any, id: number) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id !== id) {
                rows[i].id < id ? rows[i].checked = true : rows[i].checked = false
            }
        }
    }

}
