import {Component, Inject, ViewChild, Input, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger} from "@angular/material";
import {FormControl, AbstractControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {PmTaskDetailService} from "./task-detail-dialog.service";

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
  progressValue: number = 0;
  selectUsers = new FormControl();
  selectUserList: any;

  userLists: any = [];

  title: AbstractControl;
  detail: AbstractControl;
  cost: AbstractControl;
  startDate: AbstractControl;
  endDate: AbstractControl;
  testForm: FormGroup;
  taskInfoParams: any;

  projectId: string = '';

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

    // this.selectUserList

    // this.addCheckedStatus(this.userList);
    // this.addCheckedStatus(this.roleList);
  }

  ngOnInit() {
    this.buildForm();
    this.findMemberInProject();
    this.findDemandListNotAssigned();
  }

  buildForm() {
    this.testForm = this.fb.group({
      'title': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'detail': ['', Validators.compose([])],
      'cost': ['', Validators.compose([])],
      'startDate': ['', Validators.compose([Validators.required])],
      'endDate': ['', Validators.compose([Validators.required])],
    });

    this.title = this.testForm.controls['title'];
    this.detail = this.testForm.controls['detail'];
    this.cost = this.testForm.controls['cost'];
    this.startDate = this.testForm.controls['startDate'];
    this.endDate = this.testForm.controls['endDate'];

    this.testForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data ?: any) {
    // if (!this.testForm) {
    //   return;
    // }
    // const form = this.testForm;
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

  onSubmit() {
    let memberId = this.selectUserList.map(user => user.id);
    let demand = this.demandListInTask.map(demand => demand.id);
    this.taskInfoParams = Object.assign({memberId: memberId, projectId:this.projectId, demand:demand}, this.testForm.value);
    console.log("taskInfoParams", this.taskInfoParams);
    this._service.newTask(this.taskInfoParams)
      .then(res=>{
        console.log("submit", res);
      })
  }

  getSelectUsers() {
    this.selectUserList = this.selectUsers.value;
  }

  // ngOnChanges(){
  //   this.selectUsers = new FormControl(this.users);
  // }

  // addCheckedStatus(arrList) {
  //   return arrList.map(ele => {
  //     ele.checked = false;
  //     return ele;
  //   })
  // }

  // selectRoles(role, event) {
  //   this.selectList(role, event, this.selectRoleList);
  //   if (event.checked === false) {
  //     this.remove(role, this.roleList, this.selectRoleList);
  //   }
  // }

  // selectUsers(user, event) {
  //   this.selectList(user, event, this.selectUserList);
  //   if (event.checked === false) {
  //     this.remove(user, this.userList, this.selectUserList);
  //   }
  // }

  selectList(user, event, selectUserList) {
    if (event.checked === true) {
      user.checked = true;
      selectUserList.push(user);
    }
  }

  removeRole(role: any) {
    // this.remove(role, this.roleList, this.selectRoleList);
  }

  removeUser(userList: any): void {
    //   this.remove(role, this.userList, this.selectUserList);
    this.selectUsers = new FormControl(userList);
    this.selectUserList = this.selectUsers.value;
  }

  remove(role, arrlist, selectList) {
    arrlist.forEach(user => {
      if (user == role) {
        user.checked = false;
      }
    });

    let index = selectList.indexOf(role);
    selectList.splice(index, 1);
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
