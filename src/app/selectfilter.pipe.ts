import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectfilter'
})
export class SelectfilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(values: any[], args?: any): any[] {
    let vals: any = [];
    if (args != "") {
      if (values[0].text != undefined && values[0].text.length > 0) {
        vals = values.filter(value => value.text.toLowerCase().indexOf(args.toLowerCase()) !== -1)
      } 
    } else {
      vals = values;
    }
    return vals;   
  }

}
