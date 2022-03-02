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

   istituti: any = []
   istituto: any = {}

   getListaIstituti() {
      this.httpService.callPost('getListaIstituti', null).subscribe(
         (data: any) => {
            this.istituti = data
         },
         (error: any) => { },
         () => { }
      )
   }

   chartByIstituto() {
      this.istituto.id
   }

   type = 'ComboChart'
   data = [
      ["Scheda 1", 12, 8, 7, 4, 2.5],
      ["Scheda 2", 11, 9, 6, 4, 2.5],
      ["Scheda 3", 11, 10, 4, 4, 3],
      ["Scheda 4", 10, 12, 5, 4, 6],
      ["Scheda 5", 10, 11, 5, 4, 3],
      ["Scheda 6", 11, 9, 5, 4, 2.5],
      ["Scheda 7", 12, 10, 5, 4, 2.5],
      ["Scheda 8", 10, 7, 5, 4, 3],
      ["Scheda 9", 11, 11, 5, 4, 6],
      ["Scheda 10", 11, 12, 5, 4, 3],
      ["Scheda 11", 12, 8, 5, 4, 3]
   ]
   columns = ['Scheda', 'anni 5', 'anni 6', 'anni 7', 'anni 8', 'Media']
   options = {
      vAxis: {
         title: 'Prova',
         textStyle: { color: 'black', fontName: 'monospace', fontSize: '15', bold: true, italic: false },
         titleTextStyle: { color: 'black', fontSize: '20', fontName: 'monospace', bold: true, italic: false }
      },
      hAxis: { textStyle: { color: 'black', fontName: 'monospace', fontSize: '15', bold: true, italic: false } },
      seriesType: 'bars',
      series: { 4: { type: 'line', pointShape: 'circle' } },
      pointSize: 8,
      legend: { position: 'top' }
   }
   width: number
   height: number

   resize = fromEvent(window, 'resize').pipe(debounceTime(500)).subscribe(() => {
      this.resizeChart()
   })

   resizeChart() {
      let w = $("#chart-div").width()
      let h = $("#chart-div").width() / 3
      this.options['chartArea'] = { left: w / 100 * 5, right: w / 100 * 5, top: h / 100 * 10, bottom: h / 100 * 5, width: '100%', height: '100%' }
      this.width = w
      this.height = h
   }

}
