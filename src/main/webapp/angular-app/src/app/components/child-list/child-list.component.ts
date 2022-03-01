import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'
import * as moment from 'moment'
import * as _ from 'lodash'

@Component({
    selector: 'app-child-list',
    templateUrl: './child-list.component.html',
    styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {

    istitutiOrigin: any
    listaBambiniOrigin: any = []
    listaBambini: any = []
    searchLists: any = { regioni: [], province: [], comuni: [], istituti: [], sezioni: [] }
    searchModels: any = { regione: {}, provincia: {}, comune: {}, istituto: {}, sezione: {} }

    constructor(private httpService: HttpService, private router: Router) { }

    ngOnInit(): void {
        this.childsList()
        this.getListaIstituti()
    }

    childsList() {
        this.httpService.callPost('childsList', null).subscribe(
            (data: any) => {
                this.listaBambini = data
                this.listaBambiniOrigin = data
            },
            (error: any) => { },
            () => { }
        )
    }

    getListaIstituti() {
        this.httpService.callPost('getListaIstituti', null).subscribe(
            (data: any) => {
                this.istitutiOrigin = data
                this.initCombos()
            },
            (error: any) => { },
            () => { }
        )
    }

    getNomeIstituto(idIstituto) {
        let inst = _.find(this.istitutiOrigin, ['id', idIstituto])
        if (inst) return inst.nome
    }

    getChildAge(dataNascita: Date) {
        let monthsTot = moment().diff(dataNascita, 'months')
        let years = Math.floor(monthsTot / 12)
        let months = monthsTot - (years * 12)
        return years + ' anni ' + (months > 0 ? ' e ' + months + ' mesi ' : '')
    }

    goToChildPage(childId: number) {
        //navigate to pag bambino
        //this.bambino = child
    }

    goToTest(childId: number) {
        this.router.navigate(['testBalconi', childId])
    }

    goToTestResult(childId: number) {
        this.router.navigate(['testResult', childId])
    }

    initCombos() {
        this.searchLists.regioni = _(this.istitutiOrigin).groupBy('regione').keys().value()
        this.searchLists.province = _(this.istitutiOrigin).groupBy('provincia').keys().value()
        this.searchLists.comuni = _(this.istitutiOrigin).groupBy('comune').keys().value()
        this.searchLists.istituti = this.istitutiOrigin
    }

    resetCombos() {
        this.searchModels = { regione: {}, provincia: {}, comune: {}, istituto: {}, sezione: {} }
        this.listaBambini = this.listaBambiniOrigin
        this.initCombos()
    }

    findByCombo(combo: string) {
        if (combo === 'istituto') {
            this.searchLists.istituti = [this.searchModels[combo]]
        } else {
            this.searchLists.istituti = _.filter(this.istitutiOrigin, [combo, this.searchModels[combo]])
        }
        this.searchLists.regioni = _(this.searchLists.istituti).groupBy('regione').keys().value()
        this.searchLists.province = _(this.searchLists.istituti).groupBy('provincia').keys().value()
        this.searchLists.comuni = _(this.searchLists.istituti).groupBy('comune').keys().value()
        this.listaBambini = []
        for (let i = 0; i < this.searchLists.istituti.length; i++) {
            this.listaBambini = this.listaBambini.concat(_.filter(this.listaBambiniOrigin, ['idIstituto', this.searchLists.istituti[i].id]))
        }
        this.searchModels.regione = (this.searchLists.regioni.length === 1 ? this.searchLists.regioni[0] : {})
        this.searchModels.provincia = (this.searchLists.province.length === 1 ? this.searchLists.province[0] : {})
        this.searchModels.comune = (this.searchLists.comuni.length === 1 ? this.searchLists.comuni[0] : {})
        this.searchModels.istituto = (this.searchLists.istituti.length === 1 ? this.searchLists.istituti[0] : {})
    }

}
