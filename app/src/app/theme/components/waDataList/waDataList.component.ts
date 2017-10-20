/**
 * Created by XD on 2017/7/18.
 */
import { Component, ElementRef, EventEmitter, OnChanges, ViewChild} from "@angular/core";
import {Data} from "./data.Entity";


@Component({
  selector: 'wa-dataList',
  templateUrl: './waDataList.html',
  styleUrls: ['./waDataList.scss'],
  inputs: ['dataes','checkedAll','svgType','displayControl','displayCommon','displayPeople'],
  outputs: ['outCheckDataes','outSelectedData']
})
export class WaDataList implements OnChanges {

  dataes: Data[];

  selected: Data;

  svgType: string;

  displayControl: string;

  displayCommon: boolean;

  displayPeople: boolean;

  checkedAll: boolean = false;

  checkedAllDataes: Data[];

  isExtra: boolean = false;

  multipleDataes: Data[] = [];

  outCheckDataes: EventEmitter<Data[]> = new EventEmitter<Data[]>();

  outSelectedData: EventEmitter<Data> = new EventEmitter<Data>();

  @ViewChild ('greet') greet : ElementRef;

  constructor(private ref: ElementRef) {

  }

  ngOnInit(){

    this.checkedAllDataes = this.dataes;

  }

  ngOnChanges(){

  }

  selectedData(data: Data){

    this.selected = data;

    this.outSelectedData.emit(data)
  }

  isSelected(data: Data): boolean {

    if (!data || !this.selected) {
      return false;
    }

    return data.id === this.selected.id;
  }



  multipleSelection(data: Data){

    if(!this.checkedAll){

      this.checkedAllDataes = this.dataes;

      this.isExtra = false;

      this.multipleDataes.map((extra)=>{

        this.isExtra = this.isExtra || (extra == data)

      });

      if(!this.isExtra){
        this.multipleDataes.push(data);
      }else{
        this.multipleDataes = this.multipleDataes.filter((extra) => extra !== data)
      }

      this.outCheckDataes.emit(this.multipleDataes);

    }else{

      this.multipleDataes = [];

      console.log('else');

      this.isExtra = false;

      this.checkedAllDataes.map((extra)=>{

        this.isExtra = this.isExtra || (extra == data)

      });

      if(!this.isExtra){
        this.checkedAllDataes.push(data);
      }else{
        this.checkedAllDataes = this.checkedAllDataes.filter((extra) => extra !== data)
      }

      this.outCheckDataes.emit(this.checkedAllDataes);

    }

  }

}
