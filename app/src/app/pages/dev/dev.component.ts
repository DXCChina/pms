import {Component} from "@angular/core";

@Component({
  selector: 'dev',
  styleUrls: ['./dev.component.scss'],
  template: `
    <pms-sidebar></pms-sidebar>
    <div class="pms-main"><router-outlet></router-outlet></div>`
})
export class DevComponent {}
