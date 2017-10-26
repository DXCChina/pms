/**
 * Created by XD on 2017/7/19.
 */
import {Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";
import {SearchField} from "../waDataList/searchField.Entity";
@Component({
  selector:'wa-sort',
  templateUrl:'./waSort.html',
  styleUrls:['./waSort.scss'],
  outputs:['outDirection','outFieldName']
})
export class WaSort{

  @Input() sortFields : SearchField[];

  judgeImg : boolean = true;

  outDirection : EventEmitter<string> = new EventEmitter<string>();

  outFieldName : EventEmitter<string> = new EventEmitter<string>();

  constructor( private elementRef:ElementRef) {

  }

  changeValue(sortField: any){
    this.outFieldName.emit(sortField.value ? sortField.value : 'time');

  }

  changedImg(){

    this.judgeImg = !this.judgeImg;

    let img : HTMLElement = this.elementRef.nativeElement.querySelector("#img");

    if(!this.judgeImg){


      img.setAttribute('src','../../../../assets/img/wa-img/ic_arrow_upward_black_24px.svg');

      this.outDirection.emit('ASC');

    }else{

      img.setAttribute('src','../../../../assets/img/wa-img/ic_arrow_downward_black_24px.svg');

      this.outDirection.emit('DESC');
    }

  }

}
