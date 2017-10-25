import {Component, OnInit} from "@angular/core";
import {WelcomeService} from "./welcome.service";
import {DialogCreateProjectComponent} from "./dialog-create-project/dialog-create-project.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [WelcomeService]
})

export class WelcomeComponent implements OnInit {

  projects: any[];

  constructor(private _service: WelcomeService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getProjectList();
  }

  getProjectList() {
    this._service.getProjectList()
      .then(res => {
        this.projects = res.data;
        // if (this.projects.length > 6) {
        //   this.projects = this.projects.slice(0, 7);
        // }
      })
  }

  createPro() {
    let dialogRef = this.dialog.open(DialogCreateProjectComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      this.getProjectList();
    });
  }
}

