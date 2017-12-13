import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  template: `
    <pms-sidebar></pms-sidebar>
    <div class="pms-main"><router-outlet></router-outlet></div>
  `
})
export class ProjectComponent { }
