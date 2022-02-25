import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-gestisci-istituti',
  templateUrl: './gestisci-istituti.component.html',
  styleUrls: ['./gestisci-istituti.component.css']
})
export class GestisciIstitutiComponent implements OnInit {

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) {
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
        this.istituti = data
        this.createIstitutiForm()
      },
      (error: any) => { },
      () => { }
    )
  }

  inserisciIstituto() {
    this.httpService.callPost('inserisciIstituto', this.newIstituto).subscribe(
      (data: any) => {
        this.istituti.push(data)
      },
      (error: any) => { },
      () => { }
    )
  }

  saveModIstituto(index: number) {
    var row = this.istitutiForm.controls.istitutiRows.controls[index].value
    this.httpService.callPost("saveModIstituto", row).subscribe(
      data => {
        this.istituti[index] = data
      },
      error => { },
      () => { }
    )
  }

  eliminaIstituto(index: any) {
    let url = 'eliminaIstituto?idIstituto=' + this.istituti[index].id
    this.httpService.callPost(url, null).subscribe(
      data => {
        this.istituti.splice(index, 1)
      },
      error => { },
      () => { }
    )
  }

  createIstitutiForm() {
    this.istitutiForm.controls.istitutiRows = this.formBuilder.array(
      this.istituti.map(x => this.formBuilder.group({
        id: [x.id],
        idPsicologo: [x.idPsicologo, [Validators.required]],
        nome: [x.nome, [Validators.required]],
        regione: [x.regione, [Validators.required]],
        provincia: [x.provincia, [Validators.required]],
        comune: [x.comune, [Validators.required]],
        indirizzo: [x.indirizzo, [Validators.required]]
      }))
    )
  }

  cancelModIstituto(index: number) {
    delete this.istituti[index].inModifica
    this.fromIstitutoToFormObj(this.istituti[index], index)
  }

  fromIstitutoToFormObj(istituto: any, index: number) {
    this.istitutiForm.controls.istitutiRows.controls[index].setValue({
      id: istituto.id,
      idPsicologo: istituto.idPsicologo,
      nome: istituto.nome,
      regione: istituto.regione,
      provincia: istituto.provincia,
      comune: istituto.comune,
      indirizzo: istituto.indirizzo
    })
  }

  formInvalid(index: number) {
    return this.istitutiForm.controls.istitutiRows.controls[index].pristine ||
      this.istitutiForm.controls.istitutiRows.controls[index].status === 'INVALID'
  }

}
