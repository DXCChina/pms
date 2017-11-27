import {Component} from "@angular/core";
import {DevDemandDetailService} from "./dev-dashboard.service";
import {MatDialog} from "@angular/material";
import {DemandDetailModalComponent} from "../demand-detail-modal/demand-detail-modal.component";

@Component({
  selector: 'dev-dashboard',
  templateUrl: './dev-dashboard.component.html',
  styleUrls: ['./dev-dashboard.component.scss'],
  providers:[DevDemandDetailService]
})
export class DevDashboardComponent {
  constructor(private _service:DevDemandDetailService, private dialog:MatDialog){}

  reviewDemandDetail(id){
    this._service.reviewDemandDetail(id)
      .then(res => {
        let dialogRef = this.dialog.open(DemandDetailModalComponent, {
          width: '750px',
          height:'61vh',
          data: res.data
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      });
  }
}
