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
  status: AbstractControl;
  level: AbstractControl;

  demandForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DemandDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {

    this.demandForm = this.fb.group({
      name: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      status: ['', [Validators.required]],
      level: ['', [Validators.required]]
    });
  }

  onSubmit(demandForm){
    console.log('demandForm', this.demandForm.value);
    this.dialogRef.close();
  }
  getNameError(field) {
    return this.name.hasError('required') ? '需求名不能为空' : '';
  }
}
