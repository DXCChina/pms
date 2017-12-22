import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector:'delete',
  template:`
    <div class="common-dialog-warp">
      <div class="common-dialog-title">
        <h3>删除{{data}}</h3>
      </div>
      <div class="common-dialog-content">
        <p>确定删除该{{data}}?</p>
      </div>
      <div class="common-dialog-action">
        <button mat-button (click)="closeDialog()">取消</button>
        <button mat-button (click)="cancelDialog()">确定</button>
      </div>
    </div> 

  `,
  styles: [`
    .common-dialog-warp {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: center;
    }
    h3 {
      padding: 0 19px;
    }
    button {
      margin-right: 12px;
    }
    button:focus {
      outline: none;
    }
    p {
      font-size: 17px;
      font-weight: 600;
      margin: 6px auto;
    }
    .common-dialog-title {
      width: 100%;
      height: 56px;
      background: #8847dc;
      color:#fefefe;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center; 
      align-items: center;
    }
    .common-dialog-action {
      width: 100%;
      height: 56px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end; 
      align-items: center;
      border-top: 1px solid rgba(0, 0, 0, .12);
    }
    .common-dialog-content {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center; 
      align-items: center;
    }
  `]
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
