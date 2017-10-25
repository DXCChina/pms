import {Component, OnInit} from "@angular/core";
import {WelcomeService} from "./welcome.service";

@Component({
  selector:'welcome',
  templateUrl:'./welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers:[WelcomeService]
})

export class WelcomeComponent implements OnInit{

  projects: any[];

  constructor(private _service:WelcomeService) {
  }

  ngOnInit(){
    this.getProjectList();
  }

  getProjectList(){
    this._service.getProjectList()
      .then(res=>{
        this.projects = res.data;
      })
  }
}

