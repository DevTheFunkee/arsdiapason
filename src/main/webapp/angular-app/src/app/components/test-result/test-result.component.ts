import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { ActivatedRoute, Router } from '@angular/router'
import * as _ from 'lodash'

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
    proveSchede: any = null
    prove: any = [1, 2, 3, 4, 5, 6]
    anniList: any = [5, 6, 7, 8]
    columns: any = ['Area', 'Risultato']
    numColonne: number = this.columns.length * this.anniList.length

    getResultChildTest() {
        this.httpService.callPost('getResultChildTest?idBambino=' + this.idBambino, null).subscribe(
            (data: any) => {
                this.proveSchede = data
            },
            (error: any) => { },
            () => { }
        )
    }

    getDataByColumn(column: string, anni: number, prova: number) {
        if (this.proveSchede) {
            if (column === 'Area') return 'area'
            if (column === 'Risultato' && _.find(this.proveSchede, { 'anni': anni, 'prova': prova })) {
                return 'X'
            }
        }
    }

    getColumnScore(column: string, anni: number) {
        if (this.proveSchede) {
            if (column === 'Area') return null
            if (column === 'Risultato') {
                return _.filter(this.proveSchede, { 'anni': anni }).length * 2
            }
        }
    }

}
