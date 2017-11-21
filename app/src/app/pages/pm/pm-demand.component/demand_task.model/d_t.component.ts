import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from "@angular/core";
import {D_tModel} from "./d_t.model";
import {PMDemandService} from "../pm-demand.service";

@Component({
  selector: 'd_t-component',
  templateUrl: './d_t.component.html',
  styleUrls: ['./d_t.component.scss']
})
export class D_tComponent implements OnInit {

  @Input() detailDatas: any;
  @Output() retractEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() modifyEvent: EventEmitter<any> = new EventEmitter<any>();

  targets: any[] = [
    {value: 'demand', name: '需求'},
    {value: 'task', name: '任务'}
  ];
  ttt: any;
  assignSelf: any = localStorage.getItem('userId');
  assignCustom: any[];

  ngOnInit() {
    if (this.detailDatas.demandId) {
      this.getMember();
    }
  }

  //some judge
  constructor(private ref: ElementRef, private Renderer: Renderer2, private service: PMDemandService) {
    this.assignCustom = [
      {username: '——自己——', memberId: localStorage.getItem('userId')}
    ];
  }

  retract() {
    this.retractEvent.emit(true)
  }

  modifyed() {
    console.log('---ttt---', this.ttt, this.detailDatas.memberId);
    console.log(this.detailDatas);
    this.modifyEvent.emit(this.detailDatas)
  }

  getMember() {
  this.service.getMember()
    .then(res => {
      if (res.message === 'ok') {
        this.assignCustom = res.data;
      }
    }).catch(err => console.log(err))
  }

  //target value changed method
  targetChanged(target: any) {
    let des = this.ref.nativeElement.querySelector('#Des');
    let asc = this.ref.nativeElement.querySelector('#Asc');

    if(target.value === 'task') {
      this.Renderer.addClass(des, 'isDes');
      this.Renderer.removeClass(asc, 'asc');
      this.Renderer.addClass(asc, 'isAsc');
    } else {
      this.Renderer.removeClass(des, 'isDes');
      this.Renderer.addClass(asc, 'asc');
      this.Renderer.removeClass(asc, 'isAsc');
    }
  }

}

