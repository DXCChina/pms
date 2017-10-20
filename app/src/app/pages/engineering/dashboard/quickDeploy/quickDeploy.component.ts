import {Component} from "@angular/core";
import {TaskManageService} from "../../task_manage/task-manage.service";
import {AppPages} from "../../app_manage/app.pagination.Entity";
import {ScriptPages} from "../../script_manage/script.Entity";
import {CaseManageService} from "../../case_manage/case-manage.service";
import {Device} from "../../../../theme/components/device_manage/device.Entity";
import {DashboardService} from "../dashboard.service";
import {MdDialogRef} from "@angular/material";
import {ToasterService} from "angular2-toaster";

@Component({
  selector: 'quick-deploy',
  templateUrl: './quickDeploy.html',
  styleUrls: ['./quickDeploy.scss'],
  providers: [
    TaskManageService,
    CaseManageService,
    DashboardService
  ]
})
export class QuickDeployComponent {
  showAppList: boolean = false;
  app_showNoItem: boolean = false;
  app_searchDataes: AppPages[];
  chooseApp: AppPages;

  showScriptList: boolean = false;
  script_showNoItem: boolean = false;
  script_searchDataes: ScriptPages[];
  chooseScript: ScriptPages;
  checkedDevice: string[];
  selectedIndex: number = 0

  constructor(private appService: TaskManageService,public dialogRef: MdDialogRef<QuickDeployComponent>,
              private scriptService: CaseManageService, private deployService: DashboardService, private toasterService: ToasterService,){

  }

  onSubmit() {
    this.deployService.quickDeploy(this.chooseApp.id, [this.chooseScript.id], this.checkedDevice)
      .then(res => {
        this.dialogRef.close(true);
        if (res.message === 'ok') {
          this.toasterService.pop('success', '任务已部署', 'task was deployed!');
        } else {
          this.toasterService.pop('error', '任务部署失败', 'task deployed failed!');

        }
      }, err => { console.log(err) })
  }

  queryApps(query: string){
    if(query === ''){
      this.app_searchDataes = [];
      this.app_showNoItem = false;
      this.showAppList = false;
    }else{
      this.showAppList = true;
      this.appService.queryApps(query)
        .then( res => {
          this.app_searchDataes = res.data;
          if(this.app_searchDataes.length == 0){
            this.app_showNoItem = true;
          }else{
            this.app_showNoItem = false;
          }
        }, err => console.log(err))
    }
  }

  chooseApps(app: AppPages){
    this.showAppList = false;
    this.chooseApp = app;
  }

  queryScripts(query: string){
    console.log(query)
    if(query === ''){
      this.script_searchDataes = [];
      this.script_showNoItem = false;
      this.showScriptList = false;
    }else{
      this.showScriptList = true;
      this.scriptService.getAllScripts(query)
        .then( res => {
          console.log(res)
          this.script_searchDataes = res.data;
          if(this.script_searchDataes.length == 0){
            this.script_showNoItem = true;
          }else{
            this.script_showNoItem = false;
          }
        }, err => console.log(err))
    }
  }

  chooseScripts(script: ScriptPages){
    this.showScriptList = false;
    this.chooseScript = script;
  }

  getCheckedDevice(device : Device[]) {
    this.checkedDevice = device.map(value => value.id);
  }

  nextTab() {
    this.selectedIndex += 1
    return false
  }

  prevTab() {
    this.selectedIndex -= 1
    return false
  }

}
