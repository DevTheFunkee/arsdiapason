import { Component, OnInit, Input } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-specchietto-bambino',
  templateUrl: './specchietto-bambino.component.html',
  styleUrls: ['./specchietto-bambino.component.css']
})
export class SpecchiettoBambinoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  @Input() bambino: any

  getChildAge(dataNascita: Date) {
    let monthsTot = moment().diff(dataNascita, 'months')
    let years = Math.floor(monthsTot / 12)
    let months = monthsTot - (years * 12)
    return years + ' anni ' + (months > 0 ? ' e ' + months + ' mesi ' : '')
  }

}
