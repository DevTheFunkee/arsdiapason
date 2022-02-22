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

    schede: any = []
    proveSchede: any = []
    bambino: any = null
    schedaOpen: any = null
    tabellaPunteggio: any = null
    tipiTabellaPunti: any = []
    arrayAnni: any = [5, 6, 7, 8]

    constructor(private httpService: HttpService, private activedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.getDatiSchede()
    }

    getDatiSchede() {
        let url = 'getDatiSchede?idBambino=' + this.activedRoute.snapshot.paramMap.get("id")
        this.httpService.callPost(url, null, "Non è stato possibile reperire i dati della pagina").subscribe(
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
        this.schedaOpen = scheda
        this.tabellaPunteggio = _.filter(this.proveSchede, function (o: any) { return o.numeroScheda === scheda.numero })
        this.tipiTabellaPunti = _(this.tabellaPunteggio).groupBy(function (o: any) { return o.tipo }).keys().value()
    }

    getDatiPerAnno(eta: number, property: string, tipo: string) {
        let row: any
        if (tipo === 'null') {
            row = _.find(this.tabellaPunteggio, function (o: any) { return o.anni === eta && !o.tipo })
        } else {
            row = _.find(this.tabellaPunteggio, function (o: any) { return o.anni === eta && o.tipo === tipo })
        }
        if (row) {
            return row[property]
        }
    }

    getChildAge(dataNascita) {
      let monthsTot = moment().diff(dataNascita, 'months')
      let years = Math.floor(monthsTot / 12)
      let months = monthsTot - (years * 12)
      return years + ' anni ' + (months > 0 ? ' e ' + months + ' mesi ' : '')
    }

}
