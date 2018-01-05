/**
 * Created by gaole on 2017/12/27.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'delHtmlTag' })
export class DelHtmlTagPipe implements PipeTransform {
  transform(str: string): string {
    if(!str){
      return '';
    }
    return str.replace(/<[^>]+>/g,"");
  }
}
