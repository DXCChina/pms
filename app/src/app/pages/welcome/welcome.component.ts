import {Component, OnInit} from "@angular/core";

@Component({
  selector:'welcome',
  templateUrl:'./welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent {

  projects: any[];

  constructor() {
    this.projects = [
      {projectName: 'project 1', description: 'this is project 1'},
      {projectName: 'project 2', description: 'this is project 2'}
    ];
  }
}

