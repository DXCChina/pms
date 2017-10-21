import {Component} from "@angular/core";
import {DashboardService} from "../dashboard.service";
import {MdDialogRef} from "@angular/material";
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


  constructor(public dialogRef: MdDialogRef<QuickDeployComponent>, private deployService: DashboardService,
              private toasterService: ToasterService,){

  }



}
