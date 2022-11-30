import { Component, OnInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'
import * as _ from 'lodash'
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModalConfirmationComponent } from '../alert-modal-confirmation/alert-modal-confirm.component'

@Component({
	selector: 'app-admin-child',
	templateUrl: './admin-child.component.html',
	styleUrls: ['./admin-child.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class AdminChildComponent implements OnInit {

	constructor(private httpService: HttpService, private router: Router, private modalService: BsModalService) { }

	listaIstituti: Array<Istituto> = [];
	psicologhi: any = [];
	modalRef: BsModalRef;
	istitutiOrigin: any
	listaBambini: any = []
	listaBambiniOrigin: any = []
	listaBambiniSearch: any = null
	searchCombos: any = ['regione', 'provincia', 'comune', 'istituto', 'sezione']
	searchLists: any = { regione: [], provincia: [], comune: [], istituto: [], sezione: [] }
	searchModels: any = { regione: {}, provincia: {}, comune: {}, istituto: {}, sezione: {} }
	searchCognome: string
	ngOnInit(): void {
		this.istitutiList()
		this.psicologhiList()
		this.childsList()
		this.getListaIstituti()
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
	istitutiList() {
		this.httpService.callPost('getIstituoPsicologo', null).subscribe(
			(data: any) => {
				this.listaIstituti = data;
			},
			(error: any) => { },
			() => { }
		)
	}
	psicologhiList() {
		this.httpService.callPost('psicologoList', null).subscribe(
			(data: any) => {
				this.psicologhi = data;
			},
			(error: any) => { },
			() => { }
		)
	}
	childsList() {
		this.httpService.callPost('getChildsAndPsicologo', null).subscribe(
			(data: any) => {
				this.listaBambini = data
				this.listaBambiniOrigin = data
				this.searchLists.sezione = this.initComboSezione(this.listaBambini)
			},
			(error: any) => { },
			() => { }
		)
	}
	deletePsicologo(psicologoId: number, istitutoId: number, index: any) {
		this.modalRef = this.modalService.show(AlertModalConfirmationComponent, {
			initialState: {
				text: 'Sicuri di voler procedere?',
				title: "Attenzione!",
				textColor: 'text-success',
				callback: (result: any) => {
					if (result == 'si') {
						this.httpService.callPost('deletePsicologoFromInsitute?idPsicologo=' + psicologoId + '&' + 'idIstituto=' + istitutoId, null).subscribe(
							(data: any) => {
								this.listaIstituti.find(x => x.id == istitutoId).psicologhi.splice(index, 1)
							},
							(error: any) => { },
							() => { }
						)
					}
				}
			}
		})
	}
	getNomeIstituto(idIstituto: number) {
		let inst = _.find(this.istitutiOrigin, ['id', idIstituto])
		if (inst) return inst.nome
	}
	addPsicologo(istituto: Istituto, index: any) {
		this.modalRef = this.modalService.show(AlertModalConfirmationComponent, {
			initialState: {
				text: 'Sicuri di voler procedere?',
				title: "Attenzione!",
				textColor: 'text-success',
				callback: (result: any) => {
					if (result == 'si') {
						this.httpService.callPost('addPsicologoRelationInsitute?idPsicologo=' + istituto.selectedPsicologo.id + '&' + 'idIstituto=' + istituto.id, null).subscribe(
							(data: any) => {
								this.listaIstituti.find(x => x.id == istituto.id).psicologhi.push(istituto.selectedPsicologo)
							},
							(error: any) => { },
							() => { }
						)
					}
				}
			}
		})
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
}
export class Istituto {
	id: number;
	nome: string;
	regione: string;
	provincia: string;
	comune: string;
	indirizzo: string;
	mail: string;
	showDetail: boolean;
	selectedPsicologo: Psicologo;
	psicologhi: Psicologo[]

}
export class Psicologo {
	id: number;
	nome: string;
	cognome: string;
}
