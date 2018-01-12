import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from "./pages.service";

import { BaMenuService } from '../theme';

@Component({
  selector: 'pages',
  template: `
    <ba-wel-top></ba-wel-top>
    <div class="wa-main">
        <router-outlet></router-outlet>
    </div>
    `,
  providers: [PagesService]
})
export class Pages {
  constructor(private router: Router, private service: PagesService) {
  }


  ngOnInit() {
    this.service.user_info()
      .then(res => {
        if (res.id !== '') {
          localStorage.setItem('userId', res.id);
          localStorage.setItem('userName', res.username);
        } else {
          this.router.navigate(['/login']);
        }
      }).catch(err => {
        console.log(err);
        this.router.navigate(['/login']);
      })
  }

}
