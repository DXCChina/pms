import {Component, ElementRef, Input, Renderer2} from "@angular/core";
import './ckeditor.load'
import 'ckeditor'
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'create-demand',
  templateUrl: './create_demand.html',
  styleUrls: ['./create_demand.scss']
})
export class CreateDemandComponent {


  form: FormGroup;

  title: AbstractControl;
  detail: AbstractControl;
  cost: AbstractControl;
  progress: AbstractControl;
  pickerStart: any;
  pickerEnd: any;

  targets: any[] = [
    {value: 'demand', name: '需求'},
    {value: 'task', name: '任务'}
  ];
  target: any;
  status: string = 'active';
  level: string = 'normal';
  assign: string = 'self';

  //some judge
  constructor(private fb: FormBuilder, private ref: ElementRef, private Renderer: Renderer2) {

    this.form = this.fb.group({
      "title": ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      "detail": ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      "cost": ['', Validators.compose([Validators.required, this.numberValidator])],
      "progress": ['', Validators.compose([Validators.required, this.numberValidator])]
    });

    this.title = this.form.controls["title"];
    this.detail = this.form.controls["detail"];
    this.cost = this.form.controls["cost"];
    this.progress = this.form.controls["progress"];
  }

  numberValidator(control: FormControl){
    if(!control.value.match(/^[1-9]\d*$/)){
      return {invalidCustom: true}
    }
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
