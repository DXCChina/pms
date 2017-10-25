import {Component, ElementRef, Input, Output, Renderer2} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DemandService} from "../demand.service";
import {D_tModel} from "./d_t.model";

@Component({
  selector: 'd_t-component',
  templateUrl: './d_t.component.html',
  styleUrls: ['./d_t.component.scss']
})
export class D_tComponent {

  @Input() detailDates: D_tModel;

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


  onSubmit(pickerstart: any, pickerend: any) {

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

