import {Component, OnInit} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {BaWelTopService} from './baWelTop.service';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ba-wel-top',
  templateUrl: 'baWelTop.html',
  styleUrls: ['baWelTop.scss'],
  providers: [BaWelTopService]
})
export class BaWelTop implements OnInit {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public showLevel2Menu: boolean = false;
  public isShowSidebar: boolean = false;
  public userRoleInProject: string = '';
  public userName: string = '';
  public projectName: string = '';
  public currentRole: string = '';

  constructor(private _state: GlobalState, private _service: BaWelTopService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.showNav();
  }

  ngOnInit() {
    this.showNav();
  }

  showNav() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .mergeMap(route => route.data)
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        this.userRoleInProject = window.sessionStorage.getItem('userRoleInProject');
        this.userName = window.localStorage.getItem('userName');
        this.projectName = window.sessionStorage.getItem('projectName');
        if (event && event.isShowNav === true) {
          this.showLevel2Menu = true;
        } else {
          this.showLevel2Menu = false;
        }

        if (event && event.isShowSidebar === true) {
          this.isShowSidebar = true;
        } else {
          this.isShowSidebar = false;
        }

        if (this.userRoleInProject === 'pm') {
          this.currentRole = '项目经理';
        } else if (this.userRoleInProject === 'dev') {
          this.currentRole = '开发人员';
        } else if (this.userRoleInProject === 'test') {
          this.currentRole = '测试人员';
        }

      });
  }

  showPersonInfo() {
    this.showLevel2Menu = false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

}
