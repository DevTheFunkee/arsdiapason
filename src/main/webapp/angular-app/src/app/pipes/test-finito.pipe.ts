import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testFinito'
})
export class TestFinitoPipe implements PipeTransform {

  transform(testFinito: boolean): string {
    return testFinito ? 'Si' : 'No'
  }

}
