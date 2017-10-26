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
  taskList: any[];
   rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor(private _service: WelcomeService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getProjectList();
    this.getTaskList();
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

  getTaskList(){
    this._service.getTaskList()
      .then(res=>{
        console.log("res", res);
        if(res.status == 200){
          this.taskList = res.data.map(task=>{
            task["createAt"] = new Date(task["createAt"]).toLocaleDateString()
            return task;
          })
        }
      })
  }
}

