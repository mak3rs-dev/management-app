import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  constructor() {}

  transform(value: any, args?: any): any {
    return (<string>value).replace('T', ' ').replace(/\..+$/, '');
  }

}
