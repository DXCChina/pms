import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {GlobalState} from "../../../../global.state";
import {UploadAppService} from "./upload-app.service";
import {App} from "../app.pagination.Entity";

@Component({
  selector: 'app-upload-app',
  templateUrl: './upload-app.component.html',
  styleUrls: ['./upload-app.component.scss'],
  providers: [UploadAppService]
})
export class UploadAppComponent implements OnInit {
  form: FormGroup;
  version: AbstractControl;
  platform: AbstractControl;
  description: AbstractControl;
  private app: App;
  allowUploadTypes: string[] = ["apk", "ipa", "app"];
  // 与上传应用的参数
  private fileUploadUrl = this.global.baseURL + '/api/app/upload';
  private sizeLimit = 209715200;  //200M
  private disableUpload: boolean = false;
  private isModifying: boolean = true;
  private appVersion: string = '';
  private platformType: string = '';
  // 文件的id 和  projectId
  appId: string = '';

  constructor(private _fb: FormBuilder, public dialogRef: MdDialogRef<UploadAppComponent>,
              private global: GlobalState, private _service: UploadAppService) {
    this.form = this._fb.group({
      "description": ['']
    });
    this.description = this.form.controls["description"];
  }

  ngOnInit() {

  }

  onSubmit() {
    this._service.saveApp(this.appId, sessionStorage.getItem('projectId'), this.appVersion, this.description.value)
      .then(res => {
        this.disableUpload = false;
        this.dialogRef.close(true);
      });
  }

  onFileUploading() {
    this.disableUpload = true;
    this.isModifying = true
  }

  onFinishUploading(replyObj: any) {
    this.appVersion = replyObj.rsp.data.sdkVersion;
    this.platformType = replyObj.rsp.data.type;
    this.appId = replyObj.rsp.data.id;
    this.disableUpload = true;
    this.isModifying = false;
  }
}
