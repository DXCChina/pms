import {Component} from "@angular/core";
import './ckeditor.load'
import 'ckeditor'
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'create-demand',
  templateUrl: './create_demand.html',
  styleUrls: ['./create_demand.scss']
})
export class CreateDemandComponent {
  createTitle: string;
  expanded: boolean;

  form: FormGroup;
  target: string;
  pickerStart: any;
  pickerEnd: any;
  cost: number;
  progress: number;
  content: string = `<p>descripton</p>`;
  status: string = 'new';
  level: string = 'normal';
  assign: string = 'self';

  constructor(private fb: FormBuilder) {

  }

  onSubmit(pickerstart: any, pickerend: any) {

  }

  setType(title: string, type: string) {
    this.createTitle = title;
    this.target = type;
    this.expanded = false;
    return false;
  }

  openExpand(bool: boolean) {
    this.expanded = bool;
  }
}
