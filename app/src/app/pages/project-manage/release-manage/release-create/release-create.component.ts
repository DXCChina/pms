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
    this.content = '';
    this.title = '';
    this.form = new FormGroup({
         title: new FormControl('', [Validators.required]),
         content: new FormControl('', [Validators.required])
       });
  }

  onSubmit(form: any) {
     this.service.createRelease(form.title, form.content)
      .then(res => {
        if (res.message === 'ok') {
          this.dialogRef.close(true)
        }
      }, err => console.log(err));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
