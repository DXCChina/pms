import {Component, ElementRef, OnInit, Renderer2, ViewChild} from "@angular/core";
import {SelectTaskData, Task, TaskPages} from "./task.Entity";
import {SortableComponent} from "ngx-bootstrap";
import {TaskManageService} from "./task-manage.service";
import {ConfigEntity} from "../../../theme/components/w-dataList/config.Entity";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {Router} from "@angular/router";
import {EnState} from "../en.state";
import {CommonDeleteDialog} from "../../common/deleteDialog/deleteDialog.component";
import {ScriptPages} from "../script_manage/script.Entity";
import {JhiEventManager} from "ng-jhipster";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {TaskModifyComponent} from "./task_modify/task_modify.component";
import {Device} from "../../../theme/components/device_manage/device.Entity";

@Component({
  selector: "en-tm",
  templateUrl: "./task-manage.component.html",
  styleUrls: ['./task-manage.component.scss'],
  providers: [TaskManageService],
})

export class TaskManageComponent implements OnInit{

  @ViewChild(SortableComponent) sortableComponent: SortableComponent;
  checkedAll: boolean = false;
  tasks: Task;
  checkedDataes: TaskPages[] = [];
  caseList: ScriptPages[];
  dispalyDelete: boolean = true;
  contentSwitch: string = 'emptyCase';
  dataDetail: SelectTaskData;

  page: number = 1;
  size: number = 10;
  sortField: string = 'id';
  sortOrder: string = 'desc';

  configEntity: ConfigEntity;
  toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: false,
      showCloseButton: true
    });
  selectTask: TaskPages;
  tabIndex: number = 0;
  checkedDevice: Device[];

  constructor(private _service: TaskManageService, public dialog: MdDialog, private ref: ElementRef,  private toasterService: ToasterService,
              private router: Router , private enState: EnState, private Renderer: Renderer2, private eventManager: JhiEventManager){
    this.configEntity = {
      "name": "name",
      "description": "createDate",
      "id": "id"
    };
  }

   ngOnInit(){
     this.getTaskList();
     this.checkCreateEvent();
   }

   getTaskList(){
     this._service.getTaskList(this.page, this.size, this.sortField, this.sortOrder)
       .then(res =>{
         this.tasks = res;
       },error => {
         console.log(error)
       })
   }

  checkCreateEvent(){
     this.eventManager.subscribe('taskCreate', () => {
       this.getTaskList();
     })
  }

  getCasetList(query: string){
    this._service.queryCases(query)
      .then(res =>{
        this.caseList = res.data;
      })
  };

   deleteTasks(){
     this.dispalyDelete = true;
     let deleteSvg: HTMLElement = this.ref.nativeElement.querySelector('#deleteSvg');
     this.Renderer.setStyle(deleteSvg,'fill','#9e9e9e');
      let ids = [];
      this.checkedDataes.forEach( value => ids.push(value.id));
      this._service.deleteTasks(ids)
        .then(res => {
          this.getTaskList();
          this.toasterService.pop('success', '任务删除成功', 'case deleted success!');
        }, err => {console.log(err)})
   }

   getTaskDetail(id: string){
     this._service.getTaskDetail(id)
       .then(res => {
         this.dataDetail = res.data;
         this.contentSwitch = 'commonCase';
       }, err => {
         console.log(err)
       });
   }

  addItem(script) {
     this.dataDetail.testcaseVOs.push(script);
     this.dataDetail.testcaseVOs = this.dataDetail.testcaseVOs.concat();
  }

  cancelCase(id: string){
    this.getTaskDetail(id);
  }

  saveCase(){
    let caseIds = [];
    this.dataDetail.testcaseVOs.forEach(value => caseIds.push(value.id));
    this._service.modifyTask(this.dataDetail.app.id, this.dataDetail.id, caseIds, this.dataDetail.name, this.dataDetail.description)
      .then( res => {
        this.toasterService.pop('success', '案例修改成功', 'case deleted success!');
      }, err => { console.log(err) })
  }

  returnChecked(data: TaskPages[]) {
    this.checkedDataes = data;
    this.dispalyDelete = !Boolean(this.checkedDataes.length);
    let deleteSvg: HTMLElement = this.ref.nativeElement.querySelector('#deleteSvg');
    if(!this.dispalyDelete){
      this.Renderer.setStyle(deleteSvg,'fill','#f44336');
    }else{
      this.Renderer.setStyle(deleteSvg,'fill','#9e9e9e');
    }
  }

  returnPageIndex(index: number) {
    this.page = index;
    this.getTaskList();
  }

  returnSelected(select: TaskPages) {
    this.selectTask = select;
    this.getTaskDetail(select.id);
    this.tabIndex = 0;
  }

  returnSearch(search: string) {
    if (search != '') {
      console.log(search)
    }
  }

  consoleFieldName(name: string) {
    console.log(name)
  }

  consoleSort(direction: string) {
    console.log(direction)
  }

  modifyDialog(){
    let dialogRef = this.dialog.open(TaskModifyComponent, <MdDialogConfig> {
      height: "400px",
      width: "600px",
      data: {
        taskName: this.dataDetail.name,
        taskId: this.dataDetail.id,
        taskCaseIds: this.dataDetail.testcaseVOs,
        app: this.dataDetail.app,
        description: this.dataDetail.description
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result){
        this.getTaskList();
        this.getTaskDetail(this.selectTask.id);
      }
    })
  }

  deleteDialog(){
    let dialogRef = this.dialog.open(CommonDeleteDialog, <MdDialogConfig>{
      height: "170px",
      width: "300px",
      data: '任务'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteTasks();
      }
    })
  }

  createTask(){
    this.router.navigate(['/pages/project/task',{outlets: {popup: 'newTask'}}]);
    return false;
  }

  nextTab(){
    this.tabIndex = 1;
  }

  getCheckedDevice(device){
    this.checkedDevice = device;
    // console.log("checked device in task", device);
  }

  deploy(){
    let caseIds: string[] = [], deviceIds: string[] = [];
    this.dataDetail.testcaseVOs.forEach(cases => caseIds.push(cases.id));
    this.checkedDevice.forEach(dev => deviceIds.push(dev.id))
    this._service.deployTask(this.dataDetail.app.id, caseIds, deviceIds, this.dataDetail.id)
      .then(res => {
        console.log('部署状态： '+ res.message)
        this.toasterService.pop('success', '部署成功', 'deployed success!');
      }, err => {
        console.log(err.message)
      })
  }
}
