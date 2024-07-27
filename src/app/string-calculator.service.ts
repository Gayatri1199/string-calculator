import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringCalculatorService {

  constructor() { }

  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }

    const { delimiter, numberString } = this.extractDelimiterAndNumbers(numbers);
    const numberArray = numberString.split(delimiter).map(Number);

    this.checkForNegatives(numberArray);

    return numberArray
      .filter(num => num <= 1000)
      .reduce((sum, num) => sum + num, 0);
  }

  private extractDelimiterAndNumbers(input: string): { delimiter: RegExp, numberString: string } {
    if (input.startsWith('//')) {
      const parts = input.split('\n', 2);
      const delimiter = this.extractDelimiter(parts[0]);
      return { delimiter, numberString: parts[1] };
    }
    return { delimiter: /,|\n/, numberString: input };
  }

  private extractDelimiter(header: string): RegExp {
    if (header[2] === '[') {
      const delimiters = header
        .slice(3, -1)
        .split('][')
        .map(del => del.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      return new RegExp(delimiters.join('|'), 'g');
    } else {
      const delimiter = header[2];
      return new RegExp(delimiter, 'g');
    }
  }

  private checkForNegatives(numbers: number[]): void {
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }
  }
}
