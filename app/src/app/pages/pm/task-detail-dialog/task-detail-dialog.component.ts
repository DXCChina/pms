import {Component, Inject, ViewChild, Input, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger} from "@angular/material";
import {FormControl, AbstractControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {PmTaskDetailService} from "./task-detail-dialog.service";
import {Subscription} from "rxjs";

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

  searchObservable: Subscription;

  userLists: any = [];

  title: AbstractControl;
  detail: AbstractControl;
  cost: AbstractControl;
  startDate: AbstractControl;
  endDate: AbstractControl;
  taskForm: FormGroup;
  taskInfoParams: any;
  taskInfo: any;

  projectId: string = '';
  search: AbstractControl;
  form: FormGroup;

  mode: string;

  constructor(public dialogRef: MatDialogRef<TaskDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder, private _service: PmTaskDetailService) {
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
    this.taskInfo = this.data.taskInfo;
  }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('')
    });
    this.search = this.form.controls['search'];

    this.buildForm();
    this.findMemberInProject();
    this.findDemandListNotAssigned();

    if (this.mode === 'update') {
      this.selectUserList = this.taskInfo.member.map(ele => {
        return {id: ele.id, name: ele.username};
      });
      this.selectUsers = new FormControl(this.selectUserList);
    }
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
    // if (!this.taskForm) {
    //   return;
    // }
    // const form = this.taskForm;
    // for (const field in this.formErrors) {
    //
    //   this.formErrors[field] = '';
    //   const control = form.get(field);
    //
    //   if (control && control.dirty && !control.valid) {
    //     const messages = this.validationMessages[field];
    //     for (const key in control.errors) {
    //       this.formErrors[field] += messages[key] + ' ';
    //     }
    //   }
    // }
  }

  findMemberInProject() {
    this._service.findMemberInProject(this.projectId)
      .then(res => {
        res.data.forEach(ele => {
          if (ele.role === 'dev') {
            this.userLists.forEach(user => {
              if (user.role === 'dev') {
                user.members.push({id: ele.id, name: ele.username});
              }
            })
          } else if (ele.role === 'test') {
            this.userLists.forEach(user => {
              if (user.role === 'test') {
                user.members.push({id: ele.id, name: ele.username});
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
        console.log("res", res);
      })
  }

  clear() {
    this.searchDemand = '';
  }

  onSubmit() {
    let memberId = this.selectUserList.map(user => user.id);
    let demand = this.demandListInTask.map(demand => demand.id);
    let projectId = Number(this.projectId);
    this.taskInfoParams = Object.assign({
      memberId: memberId,
      projectId: projectId,
      demand: demand
    }, this.taskForm.value);
    console.log("taskInfoParams", this.taskInfoParams);
    this._service.newTask(this.taskInfoParams)
      .then(res => {
        console.log("submit", res);
      })
  }

  getSelectUsers() {
    this.selectUserList = this.selectUsers.value;
  }

  removeUser(userList: any): void {
    //   this.remove(role, this.userList, this.selectUserList);
    this.selectUsers = new FormControl(userList);
    this.selectUserList = this.selectUsers.value;
  }

  // remove(role, arrlist, selectList) {
  //   arrlist.forEach(user => {
  //     if (user == role) {
  //       user.checked = false;
  //     }
  //   });
  //
  //   let index = selectList.indexOf(role);
  //   selectList.splice(index, 1);
  // }

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
