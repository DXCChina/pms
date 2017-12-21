import {Component, Inject} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReleaseManageService} from "../release-manage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'release-create',
  templateUrl: 'release-create.component.html',
  styleUrls: ['release-create.component.scss']
})
export class ReleaseCreateComponent {
  form: FormGroup;
  content: string;
  title: string;
  constructor(private service: ReleaseManageService, public dialogRef: MatDialogRef<ReleaseCreateComponent> ,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data? data.title : '';
    this.content = data? data.content : '';
    this.form = new FormGroup({
         title: new FormControl('', [Validators.required]),
         content: new FormControl('', [Validators.required])
       });
  }

  onSubmit(form: any) {
    if (this.data) {
       this.service.updateRelease(form.title, form.content, this.data.id)
        .then(res => {
          if (res.message === 'ok') {
            this.dialogRef.close(true)
          }
        }, err => console.log(err))
    } else {
       this.service.createRelease(form.title, form.content)
        .then(res => {
          if (res.message === 'ok') {
            this.dialogRef.close(true)
          }
        }, err => console.log(err));
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
    return false;
  }
}
