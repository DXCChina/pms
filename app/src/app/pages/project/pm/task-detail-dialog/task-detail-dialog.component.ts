import {Component, Inject, ViewChild, Input, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger} from "@angular/material";
import {FormControl, AbstractControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {PmTaskDetailService} from "./task-detail-dialog.service";
import {Subscription} from "rxjs";
import {ToasterService, ToasterConfig} from "angular2-toaster";
import {TaskInfo} from "./task.model";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'task-detail-dialog',
  templateUrl: 'task-detail-dialog.component.html',
  styleUrls: ['task-detail-dialog.component.scss'],
  providers: [PmTaskDetailService]
})
export class TaskDetailDialogComponent implements OnInit {
  @ViewChild('trigger') trigger: MatMenuTrigger;
  @ViewChild('userTrigger') userTrigger: MatMenuTrigger;
  // @Input('user-role-panel') panelClass: string;

  removable: boolean = true;
  selectable: boolean = true;

  demandListNotAssigned: any = [];
  demandListInTask: any = [];
  demandListCompletedInTask: any = [];
  searchDemand: string = '';
  progressValue: number = 0;
  selectUsers = new FormControl();
  selectUserList: any;

  userLists: any = [];

  title: AbstractControl;
  detail: AbstractControl;
  cost: AbstractControl;
  startDate: AbstractControl;
  endDate: AbstractControl;
  taskForm: FormGroup;
  taskInfoParams: any;
  taskInfo: TaskInfo = new TaskInfo();

  formErrors = {
    'title': '',
    'detail': '',
    'cost': '',
    'startDate': '',
    'endDate': ''
  };
  validationMessages = {
    'title': {
      'required': '请输入任务名称',
      'minlength': '任务名称最少4个字符长'
    },
    'startDate': {
      'required': '请输入开始日期'
    },
    'endDate': {
      'required': '请输入截止日期'
    }
  };

  projectId: string = '';
  search: AbstractControl;
  form: FormGroup;

  mode: string;
  delMemberList: any[] = [];
  delDemandList: any[] = [];

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  constructor(public dialogRef: MatDialogRef<TaskDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder, private _service: PmTaskDetailService, private toasterService: ToasterService,
              private eventManager: JhiEventManager) {
    this.projectId = sessionStorage.getItem('projectId');
    this.userLists = [
      {
        role: 'dev',
        members: []
      },
      {
        role: 'test',
        members: []
      }
    ];
    this.mode = this.data.mode;
  }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('')
    });
    this.search = this.form.controls['search'];

    if (this.mode === 'update') {
      this.taskInfo = this.data.taskInfo;
      this.delMemberList = this.selectUserList = this.taskInfo.member.map(ele => {
        return {id: ele.id, name: ele.username, role: ele.role};
      });
      this.selectUsers = new FormControl(this.selectUserList);
      this.demandListInTask = this.taskInfo.demand;
      this.demandListCompletedInTask = this.demandListInTask.filter(demand => demand.status === true);
      this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length * 100;
      this.delDemandList = this.demandListInTask.concat();
    }
    this.buildForm();
    this.findMemberInProject();
    this.findDemandListNotAssigned();
  }

  buildForm() {
    this.taskForm = this.fb.group({
      'title': [this.taskInfo.title, Validators.compose([Validators.required, Validators.minLength(4)])],
      'detail': [this.taskInfo.detail, Validators.compose([])],
      'cost': [this.taskInfo.cost, Validators.compose([])],
      'startDate': [new Date(this.taskInfo.startDate), Validators.compose([Validators.required])],
      'endDate': [new Date(this.taskInfo.endDate), Validators.compose([Validators.required])],
    });

    this.title = this.taskForm.controls['title'];
    this.detail = this.taskForm.controls['detail'];
    this.cost = this.taskForm.controls['cost'];
    this.startDate = this.taskForm.controls['startDate'];
    this.endDate = this.taskForm.controls['endDate'];

    this.taskForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data ?: any) {
    if (!this.taskForm) {
      return;
    }
    const form = this.taskForm;
    for (const field in this.formErrors) {

      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  findMemberInProject() {
    this._service.findMemberInProject(this.projectId)
      .then(res => {
        res.data.forEach(ele => {
          if (ele.role === 'dev') {
            this.userLists.forEach(user => {
              if (user.role === 'dev') {
                user.members.push({id: ele.id, name: ele.username, role: ele.role});
              }
            })
          } else if (ele.role === 'test') {
            this.userLists.forEach(user => {
              if (user.role === 'test') {
                user.members.push({id: ele.id, name: ele.username, role: ele.role});
              }
            })
          }
        });
      })
  }

  findDemandListNotAssigned() {
    this._service.getProjectDemand(this.projectId)
      .then(res => {
        if (res) {
          res.forEach(ele => {
            if (ele && !ele.activityId) {
              this.demandListNotAssigned.push(ele);
            }
          });
        }
      })
  }

  searchDemandList() {
    this._service.searchDemandList(this.searchDemand, Number(this.projectId))
      .then(res => {
        this.demandListNotAssigned = [];
        this.demandListNotAssigned = res.data;
      })
  }

  clear() {
    this.searchDemand = '';
  }

  onSubmit(data) {
    let memberId = this.selectUserList.map(user => user.id);
    let demand = this.demandListInTask.map(demand => demand.id);
    let projectId = Number(this.projectId);

    this.taskInfoParams = Object.assign({
      memberId: memberId,
      projectId: projectId,
      demand: demand,
      progress:this.progressValue || 0
    }, this.taskForm.value);
    if (this.mode === 'create') {
      this._service.newTask(this.taskInfoParams)
        .then(res => {
          if (res.msg === 'ok') {
            this.toasterService.pop('ok', '活动新建成功');
            this.eventManager.broadcast({name: 'ActivityListModification', content: 'OK'});
            this.dialogRef.close();
          } else {
            this.toasterService.pop('error', res.msg);
          }
        })
    } else if (this.mode === 'update') {
      let delDemandId = this.getDelId(this.demandListInTask, this.delDemandList);
      let delMemberId = this.getDelId(this.selectUserList, this.delMemberList);
      let doneDemandId = this.demandListCompletedInTask.map(demand => demand.id);
      this.taskInfoParams = Object.assign(
        {activityId: this.taskInfo.id, del_memberId: delMemberId, del_demand: delDemandId, done_demand: doneDemandId},
        this.taskInfoParams);
      this._service.updateTask(this.taskInfoParams)
        .then(res => {
          if (res.msg === 'ok') {
            this.toasterService.pop('ok', '活动修改成功');
            this.eventManager.broadcast({name: 'ActivityListModification', content: 'OK'});
            this.dialogRef.close();
          } else {
            this.toasterService.pop('error', res.msg);
          }
        })
    }
  }

  cancel(){
    this.dialogRef.close();
  }

  getDelId(newDatas, oldDatas) {
    let delDatas = oldDatas.filter(data => {
      let isContained = true;
      newDatas.forEach(newData => {
        if (newData.id === data.id) {
          isContained = false;
          return;
        }
      });
      return isContained;
    });
    return delDatas.map(data => data.id);
  }

  getSelectUsers() {
    this.selectUserList = this.selectUsers.value;
  }

  removeUser(userList: any): void {
    this.selectUsers = new FormControl(userList);
    this.selectUserList = this.selectUsers.value;
  }

  addDemandToTask(demand) {
    this.demandListInTask.push(demand);
    let index = this.demandListNotAssigned.indexOf(demand);
    this.demandListNotAssigned.splice(index, 1);
    this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length * 100;
  }

  toggleDemandStatus(demand, event) {
    if (event.checked === true) {
      this.demandListCompletedInTask.push(demand);
      this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length * 100;
    } else {
      let index = this.demandListCompletedInTask.indexOf(demand);
      this.demandListCompletedInTask.splice(index, 1);
      this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length * 100;
    }
  }

  deleteDemandInTask(demand) {
    let index = this.demandListInTask.indexOf(demand);
    this.demandListInTask.splice(index, 1);
    this.demandListNotAssigned.push(demand);
    this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length * 100;
  }
}
