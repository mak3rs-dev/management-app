import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalunits'
})
export class TotalunitsPipe implements PipeTransform {

  constructor() {}

  transform(value: {units?:number, units_delivered?:number}[], args?: any): any {
    let out = 0;
    value.forEach(itm => {
      out += itm.units||itm.units_delivered||0;
    });
    return out;
  }

}
