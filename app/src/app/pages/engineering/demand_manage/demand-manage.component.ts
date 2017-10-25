import {Component, ElementRef, OnInit, Renderer2} from "@angular/core";
import {ConfigEntity} from "../../../theme/components/w-dataList/config.Entity";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {CreateDemandComponent} from "./create_demand/create_demand.component";
import {DemandService} from "./demand.service";
import {SearchField} from "../../../theme/components/waDataList/searchField.Entity";

@Component({
  selector: 'demand',
  templateUrl: './demand-manage.html',
  styleUrls: ['./demand-manage.scss']
})

export class DemandManageComponent implements OnInit {

  page: number = 1;
  size: number = 10;
  sortField: string = 'createAt';
  sortOrder: string = 'desc';

  demandList: any;
  checkedDatas: any[];
  dispalyDelete: boolean = true;
  contentSwitch: string = 'emptyCase';
  selectedDatas: any;

  configSEntity: ConfigEntity = {
      "name": "title",
      "id": "id",
      "description": "detail",
  };
  sortFields: SearchField[] = [
    {"fieldValue": "createAt", "fieldName": "时间"},
    {"fieldValue": "title", "fieldName": "主题"},
    {"fieldValue": "progress", "fieldName": "完成度"}
  ];


  constructor(private matDialog: MatDialog, private service: DemandService,
              private ref: ElementRef, private Renderer: Renderer2){

  }

  ngOnInit() {
    localStorage.setItem('projectId', '1');
    localStorage.setItem('ownerId', '1');
    this.getDemandList()
  }

  getDemandList() {
    this.service.getDemandList(this.page, this.size, this.sortField, this.sortOrder)
      .then(res => {
          this.demandList = res;
      }).catch(err => console.log(err))
  }

  // dataList methods
  demandChecked(data: any[]) {
    this.checkedDatas = data;
    this.dispalyDelete = !Boolean(this.checkedDatas.length);
    let deleteSvg: HTMLElement = this.ref.nativeElement.querySelector('#deleteSvg');
    if (!this.dispalyDelete) {
      this.Renderer.setStyle(deleteSvg, 'fill', '#f44336');
    } else {
      this.Renderer.setStyle(deleteSvg, 'fill', '#9e9e9e');
    }
  }

  demandSelected(selected: any) {
    this.selectedDatas = selected;
    console.log(this.selectedDatas);
    console.log(this.selectedDatas.title);
    this.contentSwitch = 'commonCase';
    // console.log(selected)
  }

  demandSearch(search: any) {

  }

  demandPage(page: any) {
    this.page = page;
    this.getDemandList()
  }

  demandFieldName(fieldName: any) {
    this.sortField = fieldName;
    this.getDemandList();
  }

  demandSort(sort: any) {
    this.sortOrder = sort;
    this.getDemandList();
  }

  //open create dialog
  createDemand() {
    let dialogRef = this.matDialog.open(CreateDemandComponent, <MatDialogConfig>{
      height: '550px',
      width: '960px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getDemandList()
      }
    })
  }

  //delete method
  deleteDemand() {
    this.dispalyDelete = true;
    let deleteSvg: HTMLElement = this.ref.nativeElement.querySelector('#deleteSvg');
    this.Renderer.setStyle(deleteSvg, 'fill', '#9e9e9e');

    this.checkedDatas.map(item => {
      item.status = 'delete';
      return item
    });
    this.service.updateDemand(this.checkedDatas)
      .then(res => {
        this.getDemandList()
      }).catch(err => {console.log(err)});
    return false;
  }

}
