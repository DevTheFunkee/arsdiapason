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
    tabellaPunteggio: any = {}
    tipiTabellaPunti: any = {}
    arrayAnni: any = [5, 6, 7, 8]

    ngOnInit(): void {
        this.getDatiSchede()
    }

    getDatiSchede() {
        let url
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

    showDatiScheda(scheda: any) {
        this.currentScheda = scheda
        if (!this.tabellaPunteggio[scheda.numero]) {
            this.tabellaPunteggio[scheda.numero] = _.filter(this.proveSchede, function (o: any) { return o.numeroScheda === scheda.numero })
            this.tipiTabellaPunti[scheda.numero] = _(this.tabellaPunteggio[scheda.numero]).groupBy(function (o: any) { return o.tipo }).keys().value()
        }
    }

    getArrayImages(images) {
      return images ? images.split(';') : []
    }

    getDatiPerAnno(numScheda: number, eta: number, property: string, tipo: string) {
        let row: any
        if (tipo === 'null') {
            row = _.find(this.tabellaPunteggio[numScheda], function (o: any) { return o.anni === eta && !o.tipo })
        } else {
            row = _.find(this.tabellaPunteggio[numScheda], function (o: any) { return o.anni === eta && o.tipo === tipo })
        }
        if (row) {
            return row[property]
        }
    }

    getChildAge(dataNascita: Date) {
        let monthsTot = moment().diff(dataNascita, 'months')
        let years = Math.floor(monthsTot / 12)
        let months = monthsTot - (years * 12)
        return years + ' anni ' + (months > 0 ? ' e ' + months + ' mesi ' : '')
    }

}
