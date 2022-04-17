import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { ExcelService } from '../../services/excel.service'
import * as ExcelJS from 'exceljs/dist/exceljs.min.js'
import * as _ from 'lodash'

@Component({
  selector: 'app-excel-bambini',
  templateUrl: './excel-bambini.component.html',
  styleUrls: ['./excel-bambini.component.css']
})
export class ExcelBambiniComponent implements OnInit {

  constructor(private httpService: HttpService, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.getListaIstituti()
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
  { label: 'Sezione', property: 'sezione', width: 20 }]

  getListaIstituti() {
    this.httpService.callPost('getListaIstitutiForExcel', null).subscribe(
      (data: any) => {
        this.istituti = _.filter(data, function (o) { return o.id !== 1 })
      },
      (error: any) => { },
      () => { }
    )
  }

  createExcel() {
    let datiIstituo = [this.istitutoLabel, this.istituo.nome, this.istituo.id]
    let headers = []
    let widths = []
    for (let i = 0; i < this.fields.length; i++) {
      headers.push(this.fields[i].label)
      widths.push(this.fields[i].width)
    }
    let excelParams = {
      title: 'Lista Bambini',
      data: [],
      headers: [datiIstituo, headers],
      widths: widths
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
    for (let i = 0; i < this.childs.length; i++) {
      this.childs[i].idIstituto = this.istituoFromExcel.id
    }
    this.httpService.callPost('insertChildsForExcel', this.childs).subscribe(
      (data: any) => {
        this.caricamentoOk = true
        this.istituoFromExcel = {}
        this.childs = []
      },
      (error: any) => { },
      () => { }
    )
  }

}
