import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'demand-detail-dialog',
  templateUrl:'demand-detail-dialog.component.html',
  styleUrls:['demand-detail-dialog.component.scss']
})
export class DemandDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DemandDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
