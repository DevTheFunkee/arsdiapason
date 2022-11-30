import { Component, OnInit, Input } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import * as $ from 'jquery'
import * as _ from 'lodash'
import * as moment from 'moment'

@Component({
   selector: 'app-grafico-bambino',
   templateUrl: './grafico-bambino.component.html',
   styleUrls: ['./grafico-bambino.component.css']
})
export class GraficoBambinoComponent implements OnInit {

   constructor(private httpService: HttpService) { }

   ngOnInit(): void { }

   ngOnDestroy() {
      this.resize.unsubscribe()
   }

   @Input() bambino: any

   ngOnChanges(changes: any) {
      if (changes.bambino.currentValue.dataTest) {
         this.getTestBambino()
      }
   }

   prove: any = []
   anniArray: any = [5, 6, 7, 8]
   type: string
   data: any[] = []
   columns: any[] = []
   options: any = {}
   width: number
   height: number

   getTestBambino() {
      let url = 'childTest?idBambino=' + this.bambino.id
      this.httpService.callPost(url, null).subscribe(
         (data: any) => {
            this.prove = data
            this.createChartData()
         },
         (error: any) => { },
         () => { }
      )
   }

   createChartData() {
      let data: any[] = []
      if (this.prove.length) {
         let etaReale = parseFloat((moment(this.bambino.dataTest).diff(this.bambino.dataNascita, 'months') / 12).toFixed(2))
         for (let i = 0; i < 12; i++) {
            let scheda: any
            let label: string
            if (i === 0) {
               label = 'Scheda ' + (i + 1) + ' (Copia)'
               scheda = _.filter(this.prove, { 'numeroScheda': i + 1, 'tipo': 'Copia' })
            } else if (i === 1) {
               label = 'Scheda ' + i + ' (Memoria)'
               scheda = _.filter(this.prove, { 'numeroScheda': i, 'tipo': 'Memoria' })
            } else {
               label = 'Scheda ' + i
               scheda = _.filter(this.prove, { 'numeroScheda': i })
            }
            let max = _.maxBy(scheda, 'anni')
            if (max) {
               data.push([label, max['anni'], etaReale])
            } else {
               data.push([label, null, etaReale])
            }
         }
         this.createChart(data)
      }
   }

   createChart(data: any) {
      if (data.length) {
         this.data = data
         this.type = 'LineChart'
         this.columns = ['Scheda', 'Risultato Scheda', 'Anni Effettivi']
         this.options = {
            vAxis: {
               textStyle: { color: 'black', fontSize: '15', bold: true, italic: false },
               ticks: [5, 6, 7, 8]
            },
            hAxis: { textStyle: { color: 'black', fontSize: '15', bold: true, italic: false } },
            pointSize: 7,
            legend: { position: 'top' }
         }
         this.resizeChart()
      } else {
         this.data = []
      }
   }

   resize = fromEvent(window, 'resize').pipe(debounceTime(500)).subscribe(() => {
      this.resizeChart()
   })

   resizeChart() {
      let w = $("#chart-div").width() - 50 //- 50 serve perchè se la pagina crea la sbarra di scorrimento poi non si vede il bordo nero
      let h = $("#chart-div").width() / 3
      this.options['chartArea'] = { left: w / 100 * 5, right: w / 100 * 5, top: h / 100 * 10, bottom: h / 100 * 8, width: '100%', height: '100%' }
      this.width = w
      this.height = h
   }

}
