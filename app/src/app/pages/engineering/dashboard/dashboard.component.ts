import {Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {QuickDeployComponent} from "./quickDeploy/quickDeploy.component";
import {DashboardService} from "./dashboard.service";
import {DashboardData} from "./dashboard.Entity";
import {ToasterConfig} from "angular2-toaster";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  providers: [
    DashboardService,

  ]
})
export class DashboardComponent implements OnInit {

  dataInfo: DashboardData;
  toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: false,
      showCloseButton: true
    });
  rowsing: any[] = [];
  rowsed: any[] = [];
  columns: any[];
  loading: boolean = true

  constructor( public dialog: MatDialog, private service: DashboardService) {
    this.columns = [
      { prop: 'taskName', name: '任务' },
      { prop: 'type', name: '平台' },
      { prop: 'appName', name: '应用' },
      { prop: 'size', name: '应用大小' },
      { prop: 'version', name: '应用版本' },
      { prop: 'devicesNum', name: '设备数' },
      { prop: 'casesNum',name: '案例数' },
      { prop: 'scriptsNum', name: '脚本数' },
      { prop: 'status', name: '执行状态' }
    ];
  }

  ngOnInit() {
    this.getInfo()
  }

  getInfo() {
    this.service.getInfo()
      .then(res => {
        if(res.message === 'ok') {
          this.dataInfo = res.data;
          this.rowsing = res.data.runningTask.map( (item) => {
            let scriptsNum: number = 0;
            for(let i in item.scripts){
              scriptsNum++
            }
            item = {
              taskName: item.taskName,
              type: item.app.type,
              appName: item.app.name,
              size: item.app.size,
              version: item.app.version,
              devicesNum: item.devices.length,
              casesNum: item.testcases.length,
              scriptsNum: scriptsNum,
              status: item.status === 2 ? '已执行' : '执行中'
            }
            return item
          })

          this.rowsed = res.data.recentFinishedTask.map( (item) => {
            let scriptsNum: number = 0;
            for(let i in item.scripts){
              scriptsNum++
            }
            item = {
              taskName: item.taskName,
              type: item.app.type,
              appName: item.app.name,
              size: item.app.size,
              version: item.app.version,
              devicesNum: item.devices.length,
              casesNum: item.testcases.length,
              scriptsNum: scriptsNum,
              status: item.status === 2 ? '已执行' : '执行中'
            }
            return item
          })
          this.loading = false
        }
      }, err => { console.log(err) })
  }

  quickDeploied(){
    let dialogRef = this.dialog.open(QuickDeployComponent, <MatDialogConfig>{
      width: '920px',
      height: '580px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
