import {Component, Inject, ViewChild, Input, OnInit} from "@angular/core";
import {MatMenuTrigger} from "@angular/material";
import {FormControl, AbstractControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {PmTaskDetailService} from "./task-detail-dialog.service";
import {ToasterService, ToasterConfig} from "angular2-toaster";
import {TaskInfo} from "./task.model";
import {JhiEventManager} from "ng-jhipster";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dev-set-detail',
  templateUrl: 'dev-set-detail.component.html',
  styleUrls: ['dev-set-detail.component.scss'],
  providers: [PmTaskDetailService]
})
export class DevSetDetailComponent implements OnInit {
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

  projectId: number;
  releaseId: number;
  search: AbstractControl;
  form: FormGroup;

  mode: string;
  delMemberList: any[] = [];
  delDemandList: any[] = [];

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  isOperate:boolean = false;
  role: string = '';

  constructor(public fb: FormBuilder, private _service: PmTaskDetailService, private toasterService: ToasterService,
              private eventManager: JhiEventManager, private router:Router, private route:ActivatedRoute) {
    this.projectId = Number(sessionStorage.getItem('projectId'));
    this.releaseId = Number(sessionStorage.getItem('releaseId'));
    this.role = sessionStorage.getItem('userRoleInProject');

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

    this.route.queryParams.filter(params => params.type)
      .subscribe(params => {
        this.mode = params.type;
      })
  }

  ngOnInit() {
    this.isOperate = this.role == 'pm';

    this.form = new FormGroup({
      search: new FormControl('')
    });
    this.search = this.form.controls['search'];

    if (this.mode != 'new') {
      // this.taskInfo = this.data.taskInfo;
      this.route.params.subscribe(param => {
        if (param['id']) {
          this.reviewDetail(param['id']);
        }
      });
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

  reviewDetail(id){
    this._service.reviewDetail(id)
      .then(res=>{
        console.log('activity info:', res);
        this.taskInfo = res;

        this.delMemberList = this.selectUserList = this.taskInfo.member.map(ele => {
          return {id: ele.id, name: ele.username, role: ele.role};
        });
        this.selectUsers = new FormControl(this.selectUserList);
        this.demandListInTask = this.taskInfo.demand;
        this.demandListCompletedInTask = this.demandListInTask.filter(demand => demand.status === true);
        this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length * 100;
        this.delDemandList = this.demandListInTask.concat();
      })
  }

  clear() {
    this.searchDemand = '';
  }

  onSubmit() {
    let memberId = this.selectUserList.map(user => user.id);
    let demand = this.demandListInTask.map(demand => demand.id);
    // let projectId = Number(this.projectId);

    this.taskInfoParams = Object.assign({
      memberId: memberId,
      projectId: this.projectId,
      releaseId:this.releaseId,
      demand: demand,
      progress:this.progressValue || 0
    }, this.taskForm.value);
    if (this.mode === 'new') {
      this._service.newTask(this.taskInfoParams)
        .then(res => {
          if (res.msg === 'ok') {
            this.toasterService.pop('ok', '活动新建成功');
            this.eventManager.broadcast({name: 'ActivityListModification', content: 'OK'});
            this.router.navigate(['../'], {relativeTo: this.route});
          } else {
            this.toasterService.pop('error', res.msg);
          }
        })
    } else {
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
            this.router.navigate(['../'], {relativeTo: this.route});
          } else {
            this.toasterService.pop('error', res.msg);
          }
        })
    }
  }

  cancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
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

