import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(stringa: string): string {
    return stringa.charAt(0).toUpperCase() + stringa.substring(1)
  }

}
