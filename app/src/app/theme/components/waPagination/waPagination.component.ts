/**
 * Created by XD on 2017/7/17.
 */

import {AfterContentInit, Component, ElementRef, EventEmitter, OnChanges, OnInit} from "@angular/core";
@Component({
  selector:'wa-pagination',
  templateUrl:'./waPagination.html',
  styleUrls:['./waPagination.scss'],
  inputs:['length','size'],
  outputs:['outPageIndex']
})
export class BaPagination implements AfterContentInit,OnInit,OnChanges{

  judgePre:boolean = false;
  judgeNext:boolean = false;
  length: number;
  page: number = 1;
  size: number;
  prePage:number;
  nextPage:number;
  outPageIndex : EventEmitter<number> = new EventEmitter<number>();

  constructor(private ref: ElementRef) {}

  ngOnInit() {}

  ngAfterContentInit(){
    this.Calculation();
  }

  ngOnChanges(){
    this.Calculation();
    if(this.length > this.nextPage){
      this.judgeNext = false;
      let next = document.getElementById("next");
      next.style.fill = "#757575";
    }
  };

  Calculation(){

    if(this.page == 1){
      this.judgePre = true;
      let pre = document.getElementById("pre");
      pre.style.fill = "#9E9E9E";
    }

    if(this.length == 0){
      this.prePage = 0;
      this.nextPage = 0;
      this.judgeNext = true;
      let next = document.getElementById("next");
      next.style.fill = "#9E9E9E";
    }else{
      this.prePage = 1 + this.size * (this.page - 1);
      if(this.size * this.page > this.length){
        this.nextPage =  this.length;
        if(this.prePage > this.nextPage){
          this.prePage  -= this.size;
          this.page --;
        }
      }else if(this.size > this.length){
        this.nextPage = this.length;
      }else{
        this.nextPage = this.size * this.page;
      }
      this.outPageIndex.emit(this.page);
    }
  }

  preClick() : boolean{

    if(this.page > 1){
      this.judgeNext = false;
      let next = document.getElementById("next");
      next.style.fill = "#757575";
      this.page -= 1;
      this.Calculation();
    }
    return false;
  }

  nextClick() : boolean{

    if(this.size * this.page < this.length){
      this.judgePre = false;
      let pre = document.getElementById("pre");
      pre.style.fill = "#757575";
      this.page += 1;
      this.Calculation();
      if(this.size * this.page >= this.length){
        this.judgeNext = true;
        let next = document.getElementById("next");
        next.style.fill = "#9E9E9E";
      }
    }
    return false;
  }
}
