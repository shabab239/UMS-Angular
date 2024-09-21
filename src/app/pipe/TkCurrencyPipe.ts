import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tkCurrency'
})
export class TkCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return `Tk ${value.toFixed(2)}`;
  }
}
