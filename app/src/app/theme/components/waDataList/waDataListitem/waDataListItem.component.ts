import {Component, ElementRef, EventEmitter, OnChanges} from "@angular/core";
import {Data} from "../data.Entity";

@Component({
  selector: 'wa-dataListItem',
  templateUrl: './waDataListItem.html',
  styleUrls: ['./waDataListItem.scss'],
  inputs: ['data','displayCheckbox','checkedAll','svgType','displayControl','displayCommon','displayPeople'],
  outputs: ['selectedData','checkedData']
})
export class WaDataListItemComponent {

  data: Data;

  svgType: string;

  displayControl: string;

  displayCommon: boolean;

  displayPeople: boolean;

  checkedAll: boolean = false;

  selectedData: EventEmitter<Data> = new EventEmitter<Data>();

  checkedData: EventEmitter<Data> = new EventEmitter<Data>();

  constructor(){}

  exportData(data: Data): void {

    this.selectedData.emit(data);

  }

  exportCheckData(data: Data){

    this.checkedData.emit(data);

  }

}
