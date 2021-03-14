import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'merge'
})
export class MergePipe implements PipeTransform {

  transform(arr1: any[], arr2: { [x: string]: any; }) {
    var arr: any[] = [];
    
    arr1.forEach((image: any, i: string | number) => {
      arr.push({ src: image, tags: arr2[i] });
    });
    console.log(arr);
    return arr;
  }
}
