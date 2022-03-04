import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sesso'
})
export class SessoPipe implements PipeTransform {

  transform(sesso: string): string {
    return sesso === 'M' ? 'Mascio' : sesso === 'F' ? 'Femmina' : null
  }

}
