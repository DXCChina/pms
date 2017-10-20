import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {GlobalState} from "../../../../global.state";
import {ScriptCreateService} from "./script-create.service";
import { ScriptType} from "../script.Entity";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "angular2-toaster";

@Component({
  selector: "script-manage-create",
  templateUrl: 'script.create.html',
  styleUrls: ['script.create.scss'],
  providers: [ScriptCreateService]
})

export class ScriptCreateComponent {

  form: FormGroup;
  description: AbstractControl;
  tag: AbstractControl;

  private scriptsizeLimit = 209715200;
  scriptUploadType: string[] = ["py", "pyw"];
  private disableUpload: boolean = false;
  private isModifying: boolean = true;
  private scriptType: ScriptType;

  private scriptUploadUrl = this.globalState.baseURL + '/api/script/upload';

  constructor(private fb: FormBuilder, public dialogRef: MdDialogRef<ScriptCreateComponent>, private globalState :GlobalState,
              private service:ScriptCreateService, private toasterService: ToasterService ) {
    this.form = this.fb.group({
      "tag": ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      "description": ['']
    });
    this.tag = this.form.controls["tag"];
    this.description = this.form.controls["description"];
  }

  onFinishUploadScript(result:any){
    this.disableUpload = true;
    this.isModifying = false;
    this.scriptType = result.rsp.data;
  }

  onScriptUploading(){
    this.disableUpload = true;
    this.isModifying = true;
  }

  addScript(){
    this.service.addScripts(this.scriptType.id, sessionStorage.getItem('projectId'), this.tag.value, this.description.value)
      .then(res => {
        this.toasterService.pop('success','上传成功','upload success!');
        this.dialogRef.close(true);
      }, error => {
        console.log(error);
      });
  }
}
