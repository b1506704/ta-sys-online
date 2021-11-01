import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDayOfWeek',
})
export class GetDayOfWeek implements PipeTransform {
  transform(day: number): string {
    if (day !== null) {
      switch (day) {
        case 2:
          return 'Monday';
        case 3:
          return 'Tuesday';
        case 4:
          return 'Wednesday';
        case 5:
          return 'Thursday';
        case 6:
          return 'Friday';
        case 7:
          return 'Saturday';
        case 8:
          return 'Sunday';
        default:
          return 'Not set';
      }
    }
  }
}
