import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeFilterUser',
})
export class RemoveFilterUser implements PipeTransform {
  constructor() {}
  transform(source: Array<any>): Array<any> {
    if (source !== null) {
      return source.filter(
        (e: any) => Object.prototype.toString.call(e.message) === '[object String]'
      );
    }
  }
}
