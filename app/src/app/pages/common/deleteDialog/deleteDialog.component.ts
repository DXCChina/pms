import {Component, Inject} from "@angular/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";

@Component({
  selector:'delete',
  template:`
    <h1 md-dialog-title></h1>
  <div md-dialog-content style="margin: 27px auto;text-align: center;font-size: 1.2em">确定删除该{{data}}?</div>
  <div md-dialog-actions style="margin-left:33px"> 
    <button md-button (click)="closeDialog()">取消</button>
    <button md-button (click)="cancelDialog()">删除</button>
  </div>
  `
})
export class CommonDeleteDialog {

  constructor( public dialogRef: MdDialogRef<CommonDeleteDialog> ,
              @Inject(MD_DIALOG_DATA) public data: any){

  }

  closeDialog(){
    this.dialogRef.close();
  }

  cancelDialog(){
    this.dialogRef.close(true)
  }

}
