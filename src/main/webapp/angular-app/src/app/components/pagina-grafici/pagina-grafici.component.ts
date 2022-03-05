import { Component, OnInit } from '@angular/core'
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
      this.getAllTests()
      this.getListaIstituti()
   }

   ngOnDestroy() {
      this.resize.unsubscribe()
   }

   istitutiOrigin: any = []
   sezioniOrigin: any = []
   provaSchedaList: any = []
   searchCombos: any = ['regione', 'provincia', 'comune', 'istituto', 'sezione']
   searchLists: any = { regione: [], provincia: [], comune: [], istituto: [], sezione: [] }
   searchModels: any = { regione: {}, provincia: {}, comune: {}, istituto: {}, sezione: {} }
   anniArray: any = [5, 6, 7, 8]
   type: string
   data: any[] = []
   columns: any[] = []
   options: any = {}
   width: number
   height: number
   showChart = false

   getAllTests() {
      this.httpService.callPost('getAllTests', null).subscribe(
         (data: any) => {
            for (var i = 0; i < data.length; i++) {
               let proveSchede = data[i].proveSchede
               for (var j = 0; j < proveSchede.length; j++) {
                  proveSchede[j].idIstituto = data[i].bambino.idIstituto
                  proveSchede[j].sezione = data[i].bambino.sezione
               }
               this.provaSchedaList = this.provaSchedaList.concat(proveSchede)
               if (!this.sezioniOrigin.includes(data[i].bambino.sezione)) {
                  this.sezioniOrigin.push(data[i].bambino.sezione)
               }
            }
            this.createChartData()
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

   initCombos() {
      this.searchLists.istituto = this.istitutiOrigin
      this.searchLists.regione = _(this.istitutiOrigin).groupBy('regione').keys().value()
      this.searchLists.provincia = _(this.istitutiOrigin).groupBy('provincia').keys().value()
      this.searchLists.comune = _(this.istitutiOrigin).groupBy('comune').keys().value()
      this.searchLists.sezione = this.sezioniOrigin
   }

   resetCombos() {
      this.searchModels = { regione: {}, provincia: {}, comune: {}, istituto: {}, sezione: {} }
      this.initCombos()
      this.createChartData()
   }

   comboDisabled(combo: string) {
      return combo === 'sezione' ? _.isEmpty(this.searchModels.istituto) : !this.searchLists[combo].length
   }

   createChartData() {
      let proveScheda = this.provaSchedaList
      let istituti = []
      if (this.searchModels.istituto.id) {
         istituti.push(this.searchModels.istituto)
      } else if (!_.isEmpty(this.searchModels.comune)) {
         istituti = _.filter(this.istitutiOrigin, { 'comune': this.searchModels.comune })
      } else if (!_.isEmpty(this.searchModels.provincia)) {
         istituti = _.filter(this.istitutiOrigin, { 'provincia': this.searchModels.provincia })
      } else if (!_.isEmpty(this.searchModels.regione)) {
         istituti = _.filter(this.istitutiOrigin, { 'regione': this.searchModels.regione })
      }
      if (istituti.length) {
         this.searchLists.regione = _(istituti).groupBy('regione').keys().value()
         this.searchLists.provincia = _(istituti).groupBy('provincia').keys().value()
         this.searchLists.comune = _(istituti).groupBy('comune').keys().value()
         this.searchLists.istituto = istituti
         this.searchModels.regione = this.searchLists.regione.length === 1 ? this.searchLists.regione[0] : {}
         this.searchModels.provincia = this.searchLists.provincia.length === 1 ? this.searchLists.provincia[0] : {}
         this.searchModels.comune = this.searchLists.comune.length === 1 ? this.searchLists.comune[0] : {}
         this.searchModels.istituto = this.searchLists.istituto.length === 1 ? this.searchLists.istituto[0] : {}
         proveScheda = []
         for (let i = 0; i < istituti.length; i++) {
            proveScheda = proveScheda.concat(_.filter(this.provaSchedaList, { 'idIstituto': istituti[i].id }))
         }
         this.searchLists.sezione = _(proveScheda).groupBy('sezione').keys().value()
         this.searchModels.sezione = this.searchLists.sezione.length === 1 ? this.searchLists.sezione[0] : {}
      }
      if (!_.isEmpty(this.searchModels.sezione)) {
         proveScheda = _.filter(proveScheda, { 'sezione': this.searchModels.sezione })
      }
      let data: any[] = []
      if (proveScheda.length) {
         for (let i = 0; i < 12; i++) {
            let scheda: any
            let label: string
            if (i === 0) {
               label = 'Scheda' + (i + 1) + ' (Copia)'
               scheda = _.filter(proveScheda, { 'numeroScheda': i + 1, 'tipo': 'Copia' })
            } else if (i === 1) {
               label = 'Scheda' + i + ' (Memoria)'
               scheda = _.filter(proveScheda, { 'numeroScheda': i, 'tipo': 'Memoria' })
            } else {
               label = 'Scheda' + i
               scheda = _.filter(proveScheda, { 'numeroScheda': i })
            }
            data.push([label, 0, 0, 0, 0])
            if (scheda.length) {
               for (let j = 0; j < this.anniArray.length; j++) {
                  data[i][j + 1] = _.filter(scheda, { 'anni': this.anniArray[j] }).length
               }
            }
         }
      }
      this.createChart(data)
   }

   createChart(data: any) {
      this.data = data
      this.type = 'ComboChart'
      this.columns = ['Scheda', 'anni 5', 'anni 6', 'anni 7', 'anni 8']
      this.options = {
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
      this.showChart = true
      this.resizeChart()
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
