import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bracketCurrency'
})
export class BracketCurrencyPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    const formattedValue = value.toFixed(2); // Assuming 2 decimal places
    if (value < 0) {
      return `(${Math.abs(Number(formattedValue))})`;
    }
    return formattedValue;
  }

}
