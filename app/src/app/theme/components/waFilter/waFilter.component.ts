/**
 * Created by XD on 2017/7/18.
 */
import {Component, ElementRef, EventEmitter, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent"
import 'rxjs/Rx'

@Component({
  selector:'wa-filter',
  templateUrl:'./waFilter.html',
  styleUrls:['./waFilter.scss'],
  inputs:['placeHolder'],
  outputs:['outSearch']
})
export class WaFilter implements OnInit{

  outSearch : EventEmitter<string> = new EventEmitter<string>();

  placeHolder: string;

  constructor( private ref : ElementRef){

  }

  ngOnInit(){
    Observable.fromEvent(this.ref.nativeElement, "keyup" )
      .map((e:any) => e.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((text:string) => this.outSearch.next(text),(err:string) => {console.log(err)},() => {console.log('complete!')})
  }
}
