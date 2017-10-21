import {Component} from "@angular/core";
import {DashboardService} from "../dashboard.service";
import {MatDialogRef} from "@angular/material";
import {ToasterService} from "angular2-toaster";

@Component({
  selector: 'quick-deploy',
  templateUrl: './quickDeploy.html',
  styleUrls: ['./quickDeploy.scss'],
  providers: [
    DashboardService
  ]
})
export class QuickDeployComponent {


  constructor(public dialogRef: MatDialogRef<QuickDeployComponent>, private deployService: DashboardService,
              private toasterService: ToasterService,){

  }



}
