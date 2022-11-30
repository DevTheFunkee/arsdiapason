import { Component, OnInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'
import * as _ from 'lodash'
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModalConfirmationComponent } from '../alert-modal-confirmation/alert-modal-confirm.component'
@Component({
	selector: 'app-admin-istituti',
	templateUrl: './admin-istituti.component.html',
	styleUrls: ['./admin-istituti.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class AdminIstitutiComponent implements OnInit {

	constructor(private httpService: HttpService, private router: Router, private modalService: BsModalService) { }

	listaIstituti: Array<Istituto> = [];
	psicologhi: any = [];
	modalRef: BsModalRef;


	ngOnInit(): void {
		this.istitutiList()
		this.psicologhiList()
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


}
export class Istituto {
	id: number;
	nome: string;
	regione: string;
	provincia: string;
	comune: string;
	indirizzo: string;
	mail: string;
	showDetail:boolean;
	selectedPsicologo:Psicologo;
	psicologhi : Psicologo[]

}
export class Psicologo {
	id:number;
	nome: string;
	cognome: string;
}