import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';

@Component({
  selector: 'pages',
  template: `
    <ba-wel-top></ba-wel-top>
    <div class="wa-main">
        <router-outlet></router-outlet>
    </div>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService) {
  }

  ngOnInit() {
    // this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
