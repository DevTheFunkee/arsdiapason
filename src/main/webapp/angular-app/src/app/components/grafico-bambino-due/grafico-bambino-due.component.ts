import { Component, OnInit, Input } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import * as $ from 'jquery'
import * as _ from 'lodash'

@Component({
  selector: 'app-grafico-bambino-due',
  templateUrl: './grafico-bambino-due.component.html',
  styleUrls: ['./grafico-bambino-due.component.css']
})
export class GraficoBambinoDueComponent implements OnInit {

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
      for (let i = 0; i < this.anniArray.length; i++) {
        data.push(['Anni ' + this.anniArray[i], _.filter(this.prove, { 'anni': this.anniArray[i] }).length * 2])
      }
    }
    this.createChart(data)
  }

  createChart(data: any) {
    if (data.length) {
      this.data = data
      this.type = 'LineChart'
      this.columns = ['Anni', 'Punti']
      this.options = {
        vAxis: {
          textStyle: { color: 'black', fontSize: '15', bold: true, italic: false },
          ticks: [0, 2, 4, 6, 8, 10, 12]
        },
        hAxis: {
          textStyle: { color: 'black', fontSize: '15', bold: true, italic: false },
          ticks: [5, 6, 7, 8]
        },
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
    let w = $("#chart-div").width()
    let h = $("#chart-div").width() / 3
    this.options['chartArea'] = { left: w / 100 * 5, right: w / 100 * 5, top: h / 100 * 10, bottom: h / 100 * 8, width: '100%', height: '100%' }
    this.width = w
    this.height = h
  }

}
