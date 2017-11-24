import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {FormControl, Validators, AbstractControl, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'demand-detail-dialog',
  templateUrl: 'demand-detail-dialog.component.html',
  styleUrls: ['demand-detail-dialog.component.scss']
})
export class DemandDetailDialogComponent {
  name: AbstractControl;
  detail: AbstractControl;
  assignTask: AbstractControl;
  level: AbstractControl;
  createAt: AbstractControl;
  demandForm: FormGroup;

  formErrors = {
    'name': '',
    'detail': '',
    'assignTask': '',
    'level': ''
  };
  validationMessages = {
    'name': {
      'required': '请输入需求名称',
      'minlength': '需求名称最少4个字符长'
    },
    'assignTask': {
    },
    'level': {
      'required': '请输入需求优先级'
    }
  };

  constructor(public dialogRef: MatDialogRef<DemandDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {
  }

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    this.demandForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      'detail': ['', Validators.compose([])],
      'assignTask': ['', Validators.compose([])],
      'level': ['', Validators.compose([Validators.required])],
      'createAt': ['', Validators.compose([])]
    });

    this.name = this.demandForm.controls['name'];
    this.detail = this.demandForm.controls['detail'];
    this.assignTask = this.demandForm.controls['assignTask'];
    this.level = this.demandForm.controls['level'];
    this.createAt = this.demandForm.controls['createAt'];

    this.demandForm.valueChanges
      .subscribe(data=>this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.demandForm) {
      return;
    }
    const form = this.demandForm;
    for (const field in this.formErrors) {

      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  onSubmit(demandForm){
    console.log('demandForm', this.demandForm.value);
    this.dialogRef.close();
  }
}
