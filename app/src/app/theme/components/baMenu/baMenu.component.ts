import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {GlobalState} from '../../../global.state';

import {ASSOCIATION_MENU} from 'app/pages/association.menu';
import {COMPANY_MENU} from 'app/pages/company.menu';
import {USER_MENU} from 'app/pages/user.menu';
import {BaMenuService} from "./baMenu.service";

@Component({
  selector: 'ba-menu',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./baMenu.scss'],
  templateUrl: './baMenu.html',
  providers: [BaMenuService]
})
export class BaMenu {

  @Input() menuRoutes: any = [];
  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;
  protected userType: string;

  constructor(private _router: Router, private _service: BaMenuService, private _state: GlobalState) {
    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this.userType = window.sessionStorage.getItem('userRoleInProject');
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  public ngOnInit(): void {
    if (this.userType === 'dev') {
      this.menuRoutes = COMPANY_MENU;
    } else {
      this.menuRoutes = ASSOCIATION_MENU;
    }

    this.menuItems = this._service.convertRoutesToMenus(this.menuRoutes);
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
  }

  public toggleSubMenu($event): boolean {
    var submenu = jQuery($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }
}
