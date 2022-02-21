import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-test-balconi',
    templateUrl: './test-balconi.component.html',
    styleUrls: ['./test-balconi.component.css']
})
export class TestBalconiComponent implements OnInit {

    schede: any = []
    proveSchede: any = []
    schedaOpen: any = null
    tabellaPunteggio: any = null
    tipiTabellaPunti: any = []
    arrayAnni: any = [5, 6, 7, 8]

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        this.getDatiSchede()
    }

    getDatiSchede() {
        this.httpService.callPost('getDatiSchede', null, "Non è stato possibile reperire la lista schede").subscribe(
            (data: any) => {
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
            row = _.find(this.tabellaPunteggio, function (o) { return o.anni === eta && !o.tipo })
        } else {
            row = _.find(this.tabellaPunteggio, function (o) { return o.anni === eta && o.tipo === tipo })
        }
        if (row) {
            return row[property]
        }
    }

}
