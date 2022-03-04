import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'eta'
})
export class EtaPipe implements PipeTransform {

  transform(dataNascita: Date): string {
    let monthsTot = moment().diff(dataNascita, 'months')
    let years = Math.floor(monthsTot / 12)
    let months = monthsTot - (years * 12)
    return years + ' anni ' + (months > 0 ? ' e ' + months + ' mesi ' : '')
  }

}
