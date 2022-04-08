import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): string {

    if(!value) {
      return value
    }

    value = value.split("-");

    return value[2]+"/"+value[1]+"/"+value[0];
  }

}
