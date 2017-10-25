import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogCreateProjectComponent} from "../dialog-create-project/dialog-create-project.component";

@Component({
  selector: 'history-project',
  templateUrl: './historyProject.html',
  styleUrls: ['./historyProject.scss']
})
export class HistoryProjectComponent {

  @Input() projects: any[] = [];

  constructor(private router: Router, public dialog: MatDialog){
      if(this.projects.length > 6) {
        this.projects = this.projects.slice(0,7);
      }
  }

  createPro(){
    let dialogRef = this.dialog.open(DialogCreateProjectComponent, {
      width: '400px',
      data: { name: "4", animal: "2" }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

}

