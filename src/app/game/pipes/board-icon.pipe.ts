import { Pipe, PipeTransform } from '@angular/core';
import { BoardMark } from 'src/app/types';
/*
 * Transform Board Mark to icon
*/
@Pipe({name: 'boardMarkIcon'})
export class BoardMarkIconPipe implements PipeTransform {
  transform(value: BoardMark): string {
    if (value === BoardMark.X) {
      return "close"
    }

    if (value === BoardMark.O) {
      return "trip_origin";
    }

    return '';
  }
}