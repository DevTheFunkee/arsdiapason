import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { FormBuilder, Validators } from '@angular/forms'
import * as _ from 'lodash'

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
        this.istituti = _.filter(data, function (o) { return o.id !== 1 })
        this.createIstitutiForm()
      },
      (error: any) => { },
      () => { }
    )
  }

  saveModIstituto(index: number) {
    var row = this.istitutiForm.controls.istitutiRows.controls[index].value
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

  inserisciIstituto() {
    this.httpService.callPost('inserisciIstituto', this.newIstituto).subscribe(
      (data: any) => {
        this.istituti.push(data)
        this.istitutiForm.controls.istitutiRows.push(this.formBuilder.group({
          id: [data.id],
          idPsicologo: [data.idPsicologo, [Validators.required]],
          nome: [data.nome, [Validators.required]],
          regione: [data.regione, [Validators.required]],
          provincia: [data.provincia, [Validators.required]],
          comune: [data.comune, [Validators.required]],
          indirizzo: [data.indirizzo, [Validators.required]]
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
      idPsicologo: this.istituti[index].idPsicologo,
      nome: this.istituti[index].nome,
      regione: this.istituti[index].regione,
      provincia: this.istituti[index].provincia,
      comune: this.istituti[index].comune,
      indirizzo: this.istituti[index].indirizzo
    })
  }

  formInvalid(index: number) {
    return this.istitutiForm.controls.istitutiRows.controls[index].pristine ||
      this.istitutiForm.controls.istitutiRows.controls[index].status === 'INVALID'
  }

}
