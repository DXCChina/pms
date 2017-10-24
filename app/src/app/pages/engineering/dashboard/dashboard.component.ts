import {Component, OnInit} from "@angular/core";
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  providers: [
    DashboardService,

  ]
})
export class DashboardComponent {

  constructor() {
  }

}
