import {Component, AfterViewInit} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {BaWelTopService} from "./baWelTop.service";
import {Subscription} from "rxjs";
import {JhiEventManager} from "ng-jhipster";
import {Router, NavigationEnd, ActivatedRoute} from "@angular/router";

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'ba-wel-top',
  templateUrl: 'baWelTop.html',
  styleUrls: ['baWelTop.scss'],
  providers: [BaWelTopService]
})
export class BaWelTop implements AfterViewInit{

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public selectedProject: string;
  public showProject: boolean = false;
  public showLevel2Menu: boolean = false;

  // public projectListUrl: string = '/api/project/list';
  public projectList: any;
  public sessionStorage = window.sessionStorage;

  eventSubscriber: Subscription;
  // activatedRoute:ActivatedRoute;

  constructor(private _state: GlobalState, private _service: BaWelTopService, private eventManager: JhiEventManager,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.showNav();
  }

  ngOnInit() {
    this.showNav();
    // this.router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .map(() => this.activatedRoute)
    //   .map(route => {
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   })
    //   // .filter(route => route.outlet === 'primary')
    //   .mergeMap(route => route.data)
    //   .subscribe((event) => {
    //     if(event&&event.showRoute){
    //       this.showLevel2Menu = true;
    //     }else {
    //       this.showLevel2Menu = false;
    //     }
    //   })

  }

  showNav(){
    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        if (event instanceof NavigationEnd) {
          if (this.isContainRoute('project')) {
            this.showLevel2Menu = true;
          } else {
            this.showLevel2Menu = false;
          }
        }
      });
  }

  ngAfterViewInit(){
    // console.log("#top wel top", this.router.events);

  }
  registerChangeInProjects() {
    this.eventSubscriber = this.eventManager.subscribe('projectListModification', (response) => {
      // this.findProjectList();
      if (this._state.isSelectProject) {
        this.showLevel2Menu = true;
      }
    });
  }

  showPersonInfo() {
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

  // findProjectList() {
  //   this._service.findProjectList(this.projectListUrl)
  //     .then(res => {
  //       this.projectList = res.data;
  //     });
  // }

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
