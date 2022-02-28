import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { ActivatedRoute, Router } from '@angular/router'
import * as _ from 'lodash'
import * as moment from 'moment'

@Component({
    selector: 'app-test-result',
    templateUrl: './test-result.component.html',
    styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

    constructor(private httpService: HttpService, private activedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.getResultChildTest()
    }

    idBambino: string = this.activedRoute.snapshot.paramMap.get("id")
    proveSchede: any
    prove: any = [1, 2, 3, 4, 5, 6]
    anniList: any = [5, 6, 7, 8]
    columns: any = ['Area', 'Risultato']
    numColonne: number = this.columns.length * this.anniList.length
    pointForYear: any = {}
    bambino: any
    realChildMonths: number
    aree: any

    getResultChildTest() {
        this.httpService.callPost('getResultChildTest?idBambino=' + this.idBambino, null).subscribe(
            (data: any) => {
                this.proveSchede = data.proveSchede
                this.bambino = data.bambino
                this.countPointsForYears()
                this.realChildMonths = moment().diff(this.bambino.dataNascita, 'months')
                this.aree = data.areaProva
            },
            (error: any) => { },
            () => { }
        )
    }

    countPointsForYears() {
        this.pointForYear = {}
        for (let i = 0; i < this.anniList.length; i++) {
            this.pointForYear[this.anniList[i]] = _.filter(this.proveSchede, { 'anni': this.anniList[i] }).length * 2
        }
        this.pointForYear['tot'] = this.pointForYear[5] * 5 + this.pointForYear[6] + this.pointForYear[7] + this.pointForYear[8]
    }

    getDataByColumn(column: string, anni: number, prova: number) {
        if (this.proveSchede) {
            if (column === 'Area') return _.find(this.aree, { 'anni': anni, 'prova': prova }).testo
            if (column === 'Risultato' && _.find(this.proveSchede, { 'anni': anni, 'prova': prova })) {
                return 'X'
            }
        }
    }

    parseInt(num: number) {
        return parseInt(num + '')
    }

    getIndiceSviluppo() {
        if (this.pointForYear['tot'] && this.realChildMonths)
            return (this.pointForYear['tot'] / this.realChildMonths).toFixed(2)
    }

}
