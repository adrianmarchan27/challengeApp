import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'image',
  pure: false
})
export class ImagePipe implements PipeTransform {

  transform({id, altImg}: Hero): string {
    if(!id && !altImg)
      return 'assets/no-image.png';
    else if (altImg)
      return altImg;
    else
    return `assets/heroes/${id}.jpg`;
  }

}
