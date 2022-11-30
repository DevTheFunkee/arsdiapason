import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { FormBuilder, Validators } from '@angular/forms'
import { AlertModalComponent } from '../alert-modal/alert-modal.component'
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModalConfirmationComponent } from '../alert-modal-confirmation/alert-modal-confirm.component'
import * as _ from 'lodash'

@Component({
	selector: 'app-gestisci-istituti',
	templateUrl: './gestisci-istituti.component.html',
	styleUrls: ['./gestisci-istituti.component.css']
})
export class GestisciIstitutiComponent implements OnInit {
    pageTitle: string
	constructor(private httpService: HttpService, private formBuilder: FormBuilder, private modalService: BsModalService) {
		this.istitutiForm = this.formBuilder.group({
			istitutiRows: this.formBuilder.array([])
		})
	}

	ngOnInit(): void {
		this.getListaIstituti()
	}
    isActive: any = false
	istitutiForm: any
	istituti: any = []
	newIstituto: any = {}
	modalRef: BsModalRef;
	InsertInstitue: any = false
	buttons = [
        { text: 'Inserisci istituto', isClicked: true, id: 1 },
        { text: "Lista istituti inseriti dall'utente", isClicked: false, id: 2 },
        { text: 'Lista totale istituti inseriti', isClicked: false, id: 3 }
    ]
	activeOnClick(button : any){
	this.buttons.forEach(function (value) {
  		if(button.id == value.id){
	      button.isClicked = !button.isClicked
		}else{
	 value.isClicked = false
	}
	}); 
	}
	getListaIstituti() {
		this.httpService.callPost('getListaIstitutiCompleta', null).subscribe(
			(data: any) => {
				this.istituti = _.filter(data, function(o) { return o.id !== 1 })
				this.createIstitutiForm();
			},
			(error: any) => { },
			() => { }
		)
	}

	saveModIstituto(index: number) {
		var row = this.istitutiForm.controls.istitutiRows.controls[index].value
		row.appUrl = window.location.origin
		this.httpService.callPost("saveModIstituto", row).subscribe(
			(data: any) => {
				this.istituti[index] = data
			},
			(error: any) => { },
			() => { }
		)
	}

	eliminaIstituto(index: any) {
		this.modalRef = this.modalService.show(AlertModalConfirmationComponent, {
			initialState: {
				text: 'Sicuri di voler eliminare l istituto dalla lista?',
				title: "Attenzione!",
				textColor: 'text-success',
				callback: (result) => {
					if (result == 'si') {
						let url = 'eliminaIstituto?idIstituto=' + this.istituti[index].id
						this.httpService.callPost(url, null).subscribe(
							(data: any) => {
								this.istituti.splice(index, 1)
							},
							(error: any) => { },
							() => { }
						)
					}
				}
			}
		})
}

	inviaMail(istituto: any) {
		//	var row = this.istitutiForm.controls.istitutiRows.controls[index].value
		istituto.appUrl = window.location.origin
		this.httpService.callPost('inviaMailIstituto', istituto).subscribe(
			(data: any) => {
				this.openModal("Mail Inviata")
			},
			(error: any) => { },
			() => { }
		)
	}
	
		inviaMailAdmin(istituto: any) {
		//	var row = this.istitutiForm.controls.istitutiRows.controls[index].value
		istituto.appUrl = window.location.origin
		this.httpService.callPost('inviaMailAdmin', istituto).subscribe(
			(data: any) => {
				this.openModal("Mail Inviata")
			},
			(error: any) => { },
			() => { }
		)
	}


	createIstitutiForm() {
		this.istitutiForm.controls.istitutiRows = this.formBuilder.array(
			this.istituti.map(x => this.formBuilder.group({
				id: [x.id],
				nome: [x.nome, [Validators.required]],
				regione: [x.regione, [Validators.required]],
				provincia: [x.provincia, [Validators.required]],
				comune: [x.comune, [Validators.required]],
				indirizzo: [x.indirizzo, [Validators.required]],
				mail: [x.mail, [Validators.required]]
			}))
		)
	}

	inserisciIstituto() {
		this.httpService.callPost('inserisciIstituto', this.newIstituto).subscribe(
			(data: any) => {
				data.associato = true
				this.istituti.push(data)
				this.istitutiForm.controls.istitutiRows.push(this.formBuilder.group({
					id: [data.id],
					nome: [data.nome, [Validators.required]],
					regione: [data.regione, [Validators.required]],
					provincia: [data.provincia, [Validators.required]],
					comune: [data.comune, [Validators.required]],
					indirizzo: [data.indirizzo, [Validators.required]],
					mail: [data.mail, [Validators.required]]
				}));
				this.InsertInstitue = false;
			},
			(error: any) => { },
			() => { }
		)
	}

	cancelModIstituto(index: number) {
		delete this.istituti[index].inModifica
		this.istitutiForm.controls.istitutiRows.controls[index].setValue({
			id: this.istituti[index].id,
			nome: this.istituti[index].nome,
			regione: this.istituti[index].regione,
			provincia: this.istituti[index].provincia,
			comune: this.istituti[index].comune,
			indirizzo: this.istituti[index].indirizzo,
			mail: this.istituti[index].mail
		})
	}

	formInvalid(index: number) {
		return this.istitutiForm.controls.istitutiRows.controls[index].pristine ||
			this.istitutiForm.controls.istitutiRows.controls[index].status === 'INVALID'
	}
	openModal(text: string) {
		const initialState = {
			textColor: 'text-success',
			title: "Ben fatto!",
			text: text
		}
		this.modalService.show(AlertModalComponent, { initialState })
	}
}
