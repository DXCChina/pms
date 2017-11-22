import { Component, OnInit } from "@angular/core";
import { WelcomeService } from "./welcome.service";
import { DialogCreateProjectComponent } from "./dialog-create-project/dialog-create-project.component";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import {GlobalState} from "../../global.state";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [WelcomeService]
})

export class WelcomeComponent implements OnInit {

  projects = { data: [], total: 0 };
  taskList = {data: [], total: 0};
  userRoleInProject: string = '';

  constructor(private _service: WelcomeService, public dialog: MatDialog, private router: Router, private _state:GlobalState) {
  }

  ngOnInit() {
    this.getProjectList();
    this.getTaskList();
  }

  getProjectList() {
    this._service.getProjectList()
      .then(res => {
        this.projects.data = res.data;
        this.projects.total = res.total;
        // if (this.projects.length > 6) {
        //   this.projects = this.projects.slice(0, 7);
        // }
      });
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

  getTaskList() {
    this._service.getTaskList()
      .then(res => {
        this.taskList.data = res.data.map(task => {
          task["createAt"] = new Date(task["createAt"]).toLocaleDateString();
          return task;
        });
        this.taskList.total = res.total;
      });
  }

  getProject(project) {
    //todo 获取用户在项目中的权限
    let projectId = project.id;

    this._service.getUserRoleInProject(projectId)
      .then(res => {
        // this.userRoleInProject = res.data
        this.userRoleInProject = 'pm';
        this.router.navigate([`/pages/${this.userRoleInProject}/dashboard`]);
        sessionStorage.setItem("userRoleInProject", this.userRoleInProject);
      });

    sessionStorage.setItem("projectId", projectId);
    sessionStorage.setItem("projectName", project.name);
  }
}

