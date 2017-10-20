import {Component, ElementRef, HostListener, Input, OnInit} from "@angular/core";

@Component({
  selector:'w-sidebar',
  templateUrl:'./w-sidebar.html',
  styleUrls:['./w-sidebar.scss']
})
export class WSidebarComponent implements OnInit {

  constructor( private ref: ElementRef){

  }

  @HostListener('window:resize',['$event'])
  onResize(event){
    let waList : HTMLElement = this.ref.nativeElement.querySelector(".wa-sidebar-center");
    waList.style.height = document.body.offsetHeight - 172 + 'px';
  }

  ngOnInit(){
    this.onResize(event)
  }
}
