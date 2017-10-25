import {Component, ElementRef, EventEmitter, Input, Output, Renderer2} from "@angular/core";
import {D_tModel} from "./d_t.model";

@Component({
  selector: 'd_t-component',
  templateUrl: './d_t.component.html',
  styleUrls: ['./d_t.component.scss']
})
export class D_tComponent {

  @Input() detailDatas: D_tModel;
  @Output() retractEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() modifyEvent: EventEmitter<any> = new EventEmitter<any>();

  targets: any[] = [
    {value: 'demand', name: '需求'},
    {value: 'task', name: '任务'}
  ];

  assignCustom = [
    {userName: '——自己——', userId: 1}
  ];

  //some judge
  constructor(private ref: ElementRef, private Renderer: Renderer2) {

  }

  retract() {
    this.retractEvent.emit(true)
  }

  modifyed(title: any) {
    this.modifyEvent.emit(this.detailDatas)
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

