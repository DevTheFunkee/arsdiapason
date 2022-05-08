import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { ExcelService } from '../../services/excel.service'
import * as ExcelJS from 'exceljs/dist/exceljs.min.js'
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModalConfirmationComponent } from '../alert-modal-confirmation/alert-modal-confirm.component'
import { Router} from '@angular/router'
import * as _ from 'lodash'

@Component({
	selector: 'app-excel-bambini',
	templateUrl: './excel-bambini.component.html',
	styleUrls: ['./excel-bambini.component.css']
})
export class ExcelBambiniComponent implements OnInit {

	constructor(private router: Router,private httpService: HttpService, private excelService: ExcelService, private route: ActivatedRoute, private modalService: BsModalService) { }
	idPsicologo: string = ''
    istituto: any
	modalRef: BsModalRef;
	ngOnInit(): void {
        this.istituto = ''
		this.idPsicologo = this.route.snapshot.paramMap.get('idPsicologo');
		let idIstituto = this.route.snapshot.paramMap.get('idIstituto');
		this.getIstituto(idIstituto)
	}

	caricamentoOk = false
	istitutoLabel: string = 'istituto'
	istituoFromExcel: any = {}
	istituo: any

	istituti: any[] = []
	childs: any[] = []
	fields: any[] = [{ label: 'Nome', property: 'nome', width: 25 },
	{ label: 'Cognome', property: 'cognome', width: 25 },
	{ label: 'Sesso (M/F)', property: 'sesso', width: 15 },
	{ label: 'Data di Nascita (gg/mm/aaaa)', property: 'dataNascita', width: 30 },
	{ label: 'Sezione', property: 'sezione', width: 20 },
	{ label: 'Comune di Nascita', property: 'comuneNascita', width: 25 },
	{ label: 'Comune di Residenza', property: 'comuneResidenza', width: 25 },
	{ label: 'Indirizzo di Residenza', property: 'indirizzoResidenza', width: 30 },
	{ label: 'Numero Fratelli', property: 'numeroFratelli', width: 25 },
	{ label: 'Numero Sorelle', property: 'numeroSorelle', width: 25 },
	{ label: 'Ordine Genitura', property: 'ordineGenitura', width: 25 },
	{ label: 'Lavoro Padre', property: 'lavoroPadre', width: 25 },
	{ label: 'Lavoro Madre', property: 'lavoroMadre', width: 25 },
	{ label: 'Titolo di Studio del Padre', property: 'titoloStudioPadre', width: 35 },
	{ label: 'Titolo di Studio della Madre', property: 'titoloStudioMadre', width: 35 },
	{ label: 'Note', property: 'note', width: 15 }]

	getIstituto(idIstituto: string) {
		if(this.istituto === undefined) {return}
		let url = 'getIstitutoForExcel?idIstituto=' + idIstituto
		this.httpService.callPost(url, null).subscribe(
			(data: any) => {
				this.istituto = data;
			},
			(error: any) => { },
			() => { }
		)
	}

	createExcel() {
		let datiIstituo = [this.istitutoLabel, this.istituto.nome, this.istituto.id]
		let headers = []
		let widths = []
		let colors = []
		for (let i = 0; i < this.fields.length; i++) {
			headers.push(this.fields[i].label)
			widths.push(this.fields[i].width)
			colors.push(this.fields[i].color)
		}
		let excelParams = {
			title: 'Lista Bambini',
			data: [],
			headers: [datiIstituo, headers],
			widths: widths,
			colors: colors
		}
		this.excelService.generateExcel(this.excelService.createExcel(excelParams), excelParams.title).then(() => { })
	}

	fileChange(event: any) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			let file: File = fileList[0];
			let formData: FormData = new FormData();
			formData.append('uploadFile', file, file.name);
			this.handleImport(file)
		}
	}

	handleImport(file: File) {
		const wb = new ExcelJS.Workbook();
		const reader = new FileReader()
		reader.readAsArrayBuffer(file)
		reader.onload = () => {
			const buffer = reader.result
			let i = -2
			wb.xlsx.load(buffer).then(wb => {
				wb.eachSheet((sheet) => {
					sheet.eachRow((row) => {
						if (i >= -1) {
							i++
							this.childs[i] = {}
						}
						let cells = row.cellCount
						for (let j = 1; j < cells + 1; j++) {
							let cell = row.getCell(j)
							if (cell.value === this.istitutoLabel) {
								this.istituoFromExcel.nome = row.getCell(2).value
								this.istituoFromExcel.id = row.getCell(3).value
								break
							}
							if (i >= 0) {
								this.childs[i][this.fields[j - 1].property] = cell.value
							} else if (cell.value === this.fields[0].label) {
								i = -1
								break
							}
						}
					})
				})
			})
		}
	}

	saveData() {
		this.modalRef = this.modalService.show(AlertModalConfirmationComponent, {
			initialState: {
				text: 'Dopo aver caricato i dati questa pagina non sarà più visibile, confermare?',
				title: "Attenzione!",
				textColor: 'text-success',
				callback: (result) => {
					if (result == 'si') {
						for (let i = 0; i < this.childs.length; i++) {
							this.childs[i].idIstituto = this.istituoFromExcel.id
						}
						let url = 'insertChildsForExcel?idPsicologo=' + this.idPsicologo
						this.httpService.callPost(url, this.childs).subscribe(
							(data: any) => {
								this.caricamentoOk = true
								this.istituoFromExcel = {}
								this.childs = []
								this.router.navigate(['loginPage']);

							},
							(error: any) => { },
							() => { }
						)
					}
				}
			}
		});

	}
}
