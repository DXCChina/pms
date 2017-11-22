import {Component, Renderer2, ElementRef} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {PMDemandService} from "./pm-demand.service";
import {ConfigEntity} from "../../../theme/components/w-dataList/config.Entity";
import {SearchField} from "../../../theme/components/waDataList/searchField.Entity";
import {CreateDemandComponent} from "./create_demand/create_demand.component";

@Component({
  selector: 'pm-demand',
  templateUrl: './pm-demand.component.html',
  styleUrls: ['./pm-demand.component.scss'],
  providers:[PMDemandService]
})
export class PmDemandComponent {
  page: number = 1;
  size: number = 10;
  sortField: string = 'createAt';
  sortOrder: string = 'desc';

  demandList: any;
  checkedDatas: any[];
  dispalyDelete: boolean = true;
  contentSwitch: string = 'emptyCase';
  demandDetails: any;
  taskList: any[];
  selectId: number;

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


  constructor(private matDialog: MatDialog, private service: PMDemandService,
              private ref: ElementRef, private Renderer: Renderer2){

  }

  ngOnInit() {
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
    this.selectId = selected.id;
    this.demandDetail(selected.id);
    // this.getTaskList(selected.id);
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
        this.getDemandList();
        if (this.selectId) {
          // this.getTaskList(this.selectId)
        }
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

    this.updateDemand(this.checkedDatas);
  }

  updateDemand(data: any) {
    this.service.updateDemand(data)
      .then(res => {
        this.getDemandList()
      }).catch(err => {console.log(err)});
    return false;
  }

  // updateTask(data: any) {
  //   this.service.updateTask(data)
  //     .then(res => {
  //       res.message === 'ok' ? console.log('update task success') : console.log('update task faild')
  //     }).catch(err => {console.log(err)})
  // }

  demandDetail(id: number) {
    this.service.demandDetail(id)
      .then(res => {
        this.demandDetails = res.data;
        this.contentSwitch = 'commonCase';
      }).catch(err => {console.log(err)})
  }

  retract(bool: boolean) {
    this.demandDetail(this.demandDetails.id)
  }

  modifyed(detail: any) {
    this.updateDemand([this.demandDetails])
  }

  // getTaskList(demandId: number) {
  //   this.service.getTaskList(demandId)
  //     .then(res => {
  //       this.taskList = res.data;
  //     }).catch(err => { console.log(err) })
  // }

  // taskRetract(bool: boolean) {
  //   this.getTaskList(this.selectId);
  //   return false;
  // }

  // taskModifyed(detail: any) {
  //   this.updateTask(detail);
  // }

  // deleteTask(task: any) {
  //   task.status = 'delete';
  //   this.updateTask(task);
  //   this.getTaskList(this.selectId);
  // }
}
