import {Component} from "@angular/core";
import {MatDialog} from "@angular/material";
import {TaskDetailDialogComponent} from "../task-detail-dialog/task-detail-dialog.component";
import {DemandDetailDialogComponent} from "../demand-detail-dialog/demand-detail-dialog.component";

@Component({
  selector: 'pm-dashboard',
  templateUrl: './pm-dashboard.component.html',
  styleUrls: ['./pm-dashboard.component.scss']
})
export class PmDashboardComponent {
  constructor(public dialog: MatDialog){

  }
  initDemand(){
    let dialogRef = this.dialog.open(DemandDetailDialogComponent, {
      width: '750px',
      height:'70vh',
      data: { name: 'dd', animal: 'dd' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  initActivity(){
    let dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      width: '750px',
      height:'70vh',
      data: { name: 'dd', animal: 'dd' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
