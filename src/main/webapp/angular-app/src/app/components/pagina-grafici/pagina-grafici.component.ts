import { Component, OnInit, OnDestroy } from '@angular/core'
import { HttpService } from '../../services/http.service'
import * as $ from 'jquery'
import * as _ from 'lodash'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Component({
   selector: 'app-pagina-grafici',
   templateUrl: './pagina-grafici.component.html',
   styleUrls: ['./pagina-grafici.component.css']
})
export class PaginaGraficiComponent implements OnInit {

   constructor(private httpService: HttpService) { }

   ngOnInit(): void {
      this.resizeChart()
      this.getListaIstituti()
   }

   ngOnDestroy() {
      this.resize.unsubscribe()
   }

   showChart = false
   istituti: any = []
   sezioni: any = []
   istituto: any = {}
   sezione: any = {}
   provaSchedaList: any = []
   type: string = 'ComboChart'
   columns: any = ['Scheda', 'anni 5', 'anni 6', 'anni 7', 'anni 8']
   width: number
   height: number
   options: any = {
      vAxis: {
         textStyle: { color: 'black', fontSize: '15', bold: true, italic: false },
      },
      hAxis: { textStyle: { color: 'black', fontSize: '15', bold: true, italic: false } },
      seriesType: 'bars',
      isStacked: 'percent',
      series: { 4: { type: 'line', pointShape: 'circle' } },
      pointSize: 8,
      legend: { position: 'top' }
   }
   data: any = [
      ["Scheda 1 (Copia)", 0, 0, 0, 0],
      ["Scheda 1 (Memoria)", 0, 0, 0, 0],
      ["Scheda 2", 0, 0, 0, 0],
      ["Scheda 3", 0, 0, 0, 0],
      ["Scheda 4", 0, 0, 0, 0],
      ["Scheda 5", 0, 0, 0, 0],
      ["Scheda 6", 0, 0, 0, 0],
      ["Scheda 7", 0, 0, 0, 0],
      ["Scheda 8", 0, 0, 0, 0],
      ["Scheda 9", 0, 0, 0, 0],
      ["Scheda 10", 0, 0, 0, 0],
      ["Scheda 11", 0, 0, 0, 0]
   ]
   anniArray: any = [5, 6, 7, 8]

   getChartBySezione() {
      let proveScheda = []
      if (this.istituto.id) {
         proveScheda = _.filter(this.provaSchedaList, { 'idIstituto': this.istituto.id })
      }
      if (this.sezione) {
         proveScheda = _.filter(proveScheda, { 'sezione': this.sezione })
      }
      if (proveScheda.length) {
         for (let i = 0; i < 12; i++) {
            let scheda: any
            if (i === 0) {
               scheda = _.filter(proveScheda, { 'numeroScheda': i + 1, 'tipo': 'Copia' })
            } else if (i === 1) {
               scheda = _.filter(proveScheda, { 'numeroScheda': i, 'tipo': 'Memoria' })
            } else {
               scheda = _.filter(proveScheda, { 'numeroScheda': i })
            }
            if (scheda.length) {
               for (let j = 0; j < this.anniArray.length; j++) {
                  this.data[i][j + 1] = _.filter(scheda, { 'anni': this.anniArray[j] }).length
               }
            }
         }
      }
      this.showChart = true
   }

   getTestsByIstituto() {
      let param = '?idIstituto=' + this.istituto.id
      this.httpService.callPost('getTestsByIstituto' + param, null).subscribe(
         (data: any) => {
            for (var i = 0; i < data.length; i++) {
               let proveSchede = data[i].proveSchede
               for (var j = 0; j < proveSchede.length; j++) {
                  proveSchede[j].idIstituto = data[i].bambino.idIstituto
                  proveSchede[j].sezione = data[i].bambino.sezione
               }
               this.provaSchedaList = this.provaSchedaList.concat(proveSchede)
               if (!this.sezioni.includes(data[i].bambino.sezione)) {
                  this.sezioni.push(data[i].bambino.sezione)
               }
            }
         },
         (error: any) => { },
         () => { }
      )
   }

   getListaIstituti() {
      this.httpService.callPost('getListaIstituti', null).subscribe(
         (data: any) => {
            this.istituti = data
         },
         (error: any) => { },
         () => { }
      )
   }

   resize = fromEvent(window, 'resize').pipe(debounceTime(500)).subscribe(() => {
      this.resizeChart()
   })

   resizeChart() {
      let w = $("#chart-div").width()
      let h = $("#chart-div").width() / 3
      this.options['chartArea'] = { left: w / 100 * 5, right: w / 100 * 5, top: h / 100 * 10, bottom: h / 100 * 8, width: '100%', height: '100%' }
      this.width = w
      this.height = h
   }

}
