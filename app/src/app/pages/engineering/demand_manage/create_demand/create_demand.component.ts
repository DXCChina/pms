import {Component, ElementRef, Renderer2} from "@angular/core";
import './ckeditor.load'
import 'ckeditor'
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material";

@Component({
  selector: 'create-demand',
  templateUrl: './create_demand.html',
  styleUrls: ['./create_demand.scss']
})
export class CreateDemandComponent {
  createTitle: string;
  expanded: boolean;

  form: FormGroup;

  pickerStart: any;
  pickerEnd: any;
  cost: number;
  progress: number;
  content: string = `<p>descripton</p>`;
  targets: any[] = [
    {value: 'demand', name: '需求'},
    {value: 'task', name: '任务'}
  ];
  target: any;
  status: string = 'new';
  level: string = 'normal';
  assign: string = 'self';

  //some judge

  constructor(private fb: FormBuilder, private ref: ElementRef, private Renderer: Renderer2) {

  }

  onSubmit(pickerstart: any, pickerend: any) {
    console.log(this.target)
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
