import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector:'delete',
  template:`
    <h1 mat-dialog-title></h1>
  <div mat-dialog-content style="margin: 27px auto;text-align: center;font-size: 1.2em">确定删除该{{data}}?</div>
  <div mat-dialog-actions style="margin-left:33px"> 
    <button mat-button (click)="closeDialog()">取消</button>
    <button mat-button (click)="cancelDialog()">删除</button>
  </div>
  `
})
export class CommonDeleteDialog {

  constructor( public dialogRef: MatDialogRef<CommonDeleteDialog> ,
              @Inject(MAT_DIALOG_DATA) public data: any){

  }

  closeDialog(){
    this.dialogRef.close();
  }

  cancelDialog(){
    this.dialogRef.close(true)
  }

}
