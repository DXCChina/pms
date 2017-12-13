import {Component} from "@angular/core";

@Component({
  selector: 'pm',
  styleUrls: ['./pm.component.scss'],
  template: `
    <pms-sidebar></pms-sidebar>
    <div class="pms-main"><router-outlet></router-outlet></div>`
})
export class PmComponent { }
