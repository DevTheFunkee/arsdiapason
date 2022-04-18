import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { FormBuilder, Validators } from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal'
import { AlertModalComponent } from '../alert-modal/alert-modal.component'
import * as _ from 'lodash'

@Component({
	selector: 'app-gestisci-istituti',
	templateUrl: './gestisci-istituti.component.html',
	styleUrls: ['./gestisci-istituti.component.css']
})
export class GestisciIstitutiComponent implements OnInit {

	constructor(private httpService: HttpService, private formBuilder: FormBuilder, private modalService: BsModalService) {
		this.istitutiForm = this.formBuilder.group({
			istitutiRows: this.formBuilder.array([])
		})
	}

	ngOnInit(): void {
		this.getListaIstituti()
	}

	istitutiForm: any
	istituti: any = []
	newIstituto: any = {}

	getListaIstituti() {
		this.httpService.callPost('getListaIstituti', null).subscribe(
			(data: any) => {
				this.istituti = _.filter(data, function(o) { return o.id !== 1 })
				this.createIstitutiForm()
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
		let url = 'eliminaIstituto?idIstituto=' + this.istituti[index].id
		this.httpService.callPost(url, null).subscribe(
			(data: any) => {
				this.istituti.splice(index, 1)
			},
			(error: any) => { },
			() => { }
		)
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
