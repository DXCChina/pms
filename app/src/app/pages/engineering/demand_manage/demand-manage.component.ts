import {Component, ElementRef, OnInit, Renderer2} from "@angular/core";
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

  constructor(private matDialog: MatDialog, private ref: ElementRef,
              private Renderer: Renderer2){

  }

  ngOnInit() {
    localStorage.setItem('projectId', '1');
    localStorage.setItem('userId', '1');
  }

  // dataList methods
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

  //open create dialog
  createDemand() {
    let dialogRef = this.matDialog.open(CreateDemandComponent, <MatDialogConfig>{
      height: '550px',
      width: '960px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
    })
  }

  //delete method
  deleteDemand() {

  }


}
