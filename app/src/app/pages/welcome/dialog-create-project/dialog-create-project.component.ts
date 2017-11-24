import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from "@angular/forms";
import {MatDatepickerInputEvent, MatDialogRef} from "@angular/material";
import { WelcomeService } from "../welcome.service";

@Component({
  selector: 'app-dialog-create-project',
  templateUrl: './dialog-create-project.component.html',
  styleUrls: ['./dialog-create-project.component.scss'],
  providers: [WelcomeService]
})
export class DialogCreateProjectComponent implements OnInit {

  name: AbstractControl;
  detail: AbstractControl;
  type: AbstractControl;
  startDate: AbstractControl;
  endDate: AbstractControl;

  form: FormGroup;
  projectType: any[];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DialogCreateProjectComponent>, private _service: WelcomeService) {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'detail': [''],
      'type': ['', Validators.compose([Validators.required])],
      'startDate': ['', Validators.compose([Validators.required])],
      'endDate': ['', Validators.compose([Validators.required])]
    });
    this.name = this.form.controls['name'];
    this.detail = this.form.controls['detail'];
    this.type = this.form.controls['type'];
    this.startDate = this.form.controls['startDate'];
    this.endDate = this.form.controls['endDate'];

    this.projectType = [
      { name: '长期项目', value: 'long-term'},
      { name: '短期项目', value: 'short-term'},
      { name: '运维项目', value: 'operation'},
    ];
  }

  ngOnInit() {

  }

  onSubmit(form: any) {
    console.log(form);
    this.dialogRef.close();
  }

  startEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
  }

  endEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
  }
}
