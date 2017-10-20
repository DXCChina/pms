import {Component, ElementRef, EventEmitter, HostListener, OnChanges, OnInit} from '@angular/core';
import {Data} from "../waDataList/data.Entity";
import {Pagination} from "../waDataList/pagnation.Entity";

@Component({
  selector: 'ba-sidebar',
  templateUrl: './baSidebar.html',
  styleUrls: ['./baSidebar.scss'],
  inputs:['dataes','paging','checkedAll','svgType','displayControl','displayCommon','displayPeople'],
  outputs:['outPageIndex','outChecked','outSelected']
  // host: {
  //   '(window:resize)': 'onResize($event)'
  // }
})
export class BaSidebar implements OnInit , OnChanges {

  checkedAll: boolean = false;

  dataes: Data[];

  paging: Pagination;

  svgType:string;

  displayControl: string;

  displayCommon: boolean;

  displayPeople: boolean;

  outPageIndex: EventEmitter<number> = new EventEmitter<number>();

  outChecked: EventEmitter<Data[]> = new EventEmitter<Data[]>();

  outSelected: EventEmitter<Data> = new EventEmitter<Data>();

  constructor( private ref: ElementRef ){

  }

  @HostListener('window:resize',['$event'])

  ngOnInit(){

    let waList : HTMLElement = this.ref.nativeElement.querySelector(".wa-sidebar-center");

    waList.style.height = document.body.offsetHeight - 172 + 'px';

  }

  ngOnChanges(){

    console.log(this.ref.nativeElement.querySelector('.dataList').childNodes)

  }
  //export data index

  exportPageIndex( index : number ){

    this.outPageIndex.emit(index);

  }

  exportChecked(dataes: Data[]){

    this.outChecked.emit(dataes)
  }

  exportSelected(data: Data){

    this.outSelected.emit(data)

  }
}
