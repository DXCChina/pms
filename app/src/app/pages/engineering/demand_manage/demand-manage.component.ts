import {Component, OnInit} from "@angular/core";
import {ConfigEntity} from "../../../theme/components/w-dataList/config.Entity";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {CreateDemandComponent} from "./create_demand/create_demand.component";

@Component({
  selector: 'demand',
  templateUrl: './demand-manage.html',
  styleUrls: ['./demand-manage.scss']
})

export class DemandManageComponent implements OnInit {

  configSEntity: ConfigEntity = {
      "name": "id",
      "id": "id",
      "description": "taskName",
  };
  contentSwitch: string = 'emptyCase';

  constructor(private matDialog: MatDialog){

  }

  ngOnInit() {
    localStorage.setItem('projectId', '1');
    localStorage.setItem('userId', '1');
  }

  demandChecked(checked: any) {

  }

  demandSelected(selected: any) {

  }

  demandSearch(search: any) {

  }

  demandPage(page: any) {

  }

  demandFieldName(fieldName: any) {

  }

  demandSort(sort: any) {

  }

  createDemand() {
    let dialogRef = this.matDialog.open(CreateDemandComponent, <MatDialogConfig>{
      height: '660px',
      width: '1060px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
    })
  }

  deleteDemand() {

  }

}
