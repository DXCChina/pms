import {Component, Inject} from "@angular/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {GlobalState} from "../../../../global.state";
import {ScriptData} from "../script.Entity";
import {ScriptDeleteService} from "./script-delete.service";

@Component({
  selector: "script-manage-delete",
  templateUrl: 'script.delete.html',
  styleUrls: ['script.delete.scss'],
  providers: [ScriptDeleteService]
})

export class ScriptDeleteComponent {
  private scriptDeleteUrl: string;
  private scriptNames=[];
  private idsValue = [];
  private _errorMsg: string;

  constructor(public dialogRef: MdDialogRef<ScriptDeleteComponent>, private globalState: GlobalState,
              @Inject(MD_DIALOG_DATA) public data: ScriptData[],private scriptDeleteService:ScriptDeleteService) {
    this.scriptDeleteUrl = this.globalState.baseURL + '/script/delete';
    for (let datas of data) {
      // this.idsValue.push(datas.id);
      // this.scriptNames.push(datas.scriptName);
    }
  }

  public deleteScript():void{
    this.scriptDeleteService.deleteScripts(this.scriptDeleteUrl,this.idsValue)
      .then(res => {
       console.log(res);
      }, error => {
        this._errorMsg = error;
      });
  }
}
