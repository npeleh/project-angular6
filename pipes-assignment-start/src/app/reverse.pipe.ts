import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    const arr = value.split('');
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[(arr.length - 1) - i]);
    }
    return newArr.join('');
  }

}
