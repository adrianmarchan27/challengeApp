import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'beautifulList'
})
export class BeautifulListPipe implements PipeTransform {

  transform({characters}: Hero): string {
    return characters.join(', ');
  }

}
