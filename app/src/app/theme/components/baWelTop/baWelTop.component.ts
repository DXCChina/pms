import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {BaWelTopService} from "./baWelTop.service";
import {Subscription} from "rxjs";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'ba-wel-top',
  templateUrl: 'baWelTop.html',
  styleUrls: ['baWelTop.scss'],
  providers: [BaWelTopService]
})
export class BaWelTop{

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public selectedProject: string;
  public showProject: boolean = false;
  public showLevel2Menu: boolean = false;

  public projectListUrl: string = '/api/project/list';
  public projectList: any;
  public sessionStorage = window.sessionStorage;

  eventSubscriber: Subscription;

  constructor(private _state: GlobalState, private _service: BaWelTopService, private eventManager: JhiEventManager) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.projectListUrl = this._state.baseURL + this.projectListUrl;
  }

  ngOnInit() {
    this.registerChangeInProjects();
  }
  
  registerChangeInProjects() {
    this.eventSubscriber = this.eventManager.subscribe('projectListModification', (response) => {
      // this.findProjectList();
      if (this._state.isSelectProject) {
        this.showLevel2Menu = true;
      }
    });
  }

  showPersonInfo(){
    this.showLevel2Menu = false;
  }

  isContainRoute(str: string) {
    let currentRoute = window.location.hash;
    let reg = new RegExp(str, "g");
    if (reg.exec(currentRoute)) {
      return true;
    }
    return false;
  }

  findProjectList() {
    this._service.findProjectList(this.projectListUrl)
      .then(res => {
        this.projectList = res.data;
      });
  }

  selectProject(project) {
    this.selectedProject = project.name;
    this.sessionStorage.setItem("projectName", project.name);
    this.sessionStorage.setItem("projectId", project.id);
    this.showProject = false;
    this.showLevel2Menu = true;
  }

  // hideLevel2Menu() {
  //   this.showLevel2Menu = false;
  //   this.selectedProject = "";
  //   this.sessionStorage.removeItem("projectName")
  //   // this.sessionStorage.clear();
  // }

  public toggleHome() {
    this.showLevel2Menu = false;
    this.selectedProject = "";
    this.sessionStorage.removeItem("projectName");
    // this.sessionStorage.clear();
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
