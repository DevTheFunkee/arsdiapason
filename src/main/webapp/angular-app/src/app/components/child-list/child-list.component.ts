import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'
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
    listaBambiniSearch: any = null
    searchCombos: any = ['regione', 'provincia', 'comune', 'istituto', 'sezione']
    searchLists: any = { regione: [], provincia: [], comune: [], istituto: [], sezione: [] }
    searchModels: any = { regione: {}, provincia: {}, comune: {}, istituto: {}, sezione: {} }
    searchCognome: string

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
                this.searchLists.sezione = this.initComboSezione(this.listaBambini)
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

    getNomeIstituto(idIstituto: number) {
        let inst = _.find(this.istitutiOrigin, ['id', idIstituto])
        if (inst) return inst.nome
    }

    searchChild() {
        let that = this
        if (that.searchCognome) {
            this.listaBambiniSearch = _.filter(this.listaBambini, function (o) {
                return o.cognome && o.cognome.toLowerCase().startsWith(that.searchCognome.toLowerCase())
            })
        } else {
            this.listaBambiniSearch = null
        }
    }

    goToTest(childId: number) {
        this.router.navigate(['testBalconi', childId])
    }

    goToTestResult(childId: number) {
        this.router.navigate(['testResult', childId])
    }

    initCombos() {
        this.searchLists.istituto = this.istitutiOrigin
        this.searchLists.regione = _(this.istitutiOrigin).groupBy('regione').keys().value()
        this.searchLists.provincia = _(this.istitutiOrigin).groupBy('provincia').keys().value()
        this.searchLists.comune = _(this.istitutiOrigin).groupBy('comune').keys().value()
    }

    initComboSezione(listaBambini: any) {
        return _(listaBambini).filter(function (o) { return o.sezione !== null }).groupBy('sezione').keys().value()
    }

    resetCombos() {
        this.searchModels = { regione: {}, provincia: {}, comune: {}, istituto: {}, sezione: {} }
        this.listaBambini = this.listaBambiniOrigin
        this.initCombos()
        this.searchLists.sezione = this.initComboSezione(this.listaBambini)
    }
  deleteBimbo(childId: number,index: any){
	  this.httpService.callPost('deleteChild?idBambino='+childId, null).subscribe(
            (data: any) => {
              this.listaBambini.splice(index, 1)
            },
            (error: any) => { },
            () => { }
        )
}
    findByCombo(combo: string) {
        if (combo === 'sezione') {
            let listaBambini = _(this.listaBambini).filter(['sezione', this.searchModels.sezione])
            let idIstituti = _(listaBambini).groupBy('idIstituto').keys().value()
            this.searchLists.sezione = this.initComboSezione(listaBambini)
            for (let i = 0; i < idIstituti.length; i++) {
                this.searchLists.istituto = _.filter(this.istitutiOrigin, ['id', parseInt(idIstituti[i])])
            }
        } else if (combo === 'istituto') {
            this.searchLists.istituto = [this.searchModels[combo]]
        } else {
            this.searchLists.istituto = _.filter(this.istitutiOrigin, [combo, this.searchModels[combo]])
        }
        this.searchLists.regione = _(this.searchLists.istituto).groupBy('regione').keys().value()
        this.searchLists.provincia = _(this.searchLists.istituto).groupBy('provincia').keys().value()
        this.searchLists.comune = _(this.searchLists.istituto).groupBy('comune').keys().value()
        this.listaBambini = []
        for (let i = 0; i < this.searchLists.istituto.length; i++) {
            if (_.isEmpty(this.searchModels.sezione)) {
                this.listaBambini = this.listaBambini.concat(_.filter(this.listaBambiniOrigin, { 'idIstituto': this.searchLists.istituto[i].id }))
            } else {
                this.listaBambini = this.listaBambini.concat(_.filter(this.listaBambiniOrigin, { 'idIstituto': this.searchLists.istituto[i].id, 'sezione': this.searchModels.sezione }))
            }
        }
        if (combo !== 'sezione') {
            this.searchLists.sezione = this.initComboSezione(this.listaBambini)
            this.searchModels.sezione = this.searchLists.sezione.length === 1 ? this.searchLists.sezione[0] : {}
        }
        this.searchModels.regione = this.searchLists.regione.length === 1 ? this.searchLists.regione[0] : {}
        this.searchModels.provincia = this.searchLists.provincia.length === 1 ? this.searchLists.provincia[0] : {}
        this.searchModels.comune = this.searchLists.comune.length === 1 ? this.searchLists.comune[0] : {}
        this.searchModels.istituto = this.searchLists.istituto.length === 1 ? this.searchLists.istituto[0] : {}
    }

    comboDisabled(combo: string) {
        return combo === 'sezione' ? _.isEmpty(this.searchModels.istituto) || !this.searchLists[combo].length : !this.searchLists[combo].length
    }

}
