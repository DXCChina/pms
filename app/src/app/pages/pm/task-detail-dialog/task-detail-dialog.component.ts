import {Component, Inject, ViewChild, Input} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger} from "@angular/material";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'task-detail-dialog',
  templateUrl: 'task-detail-dialog.component.html',
  styleUrls: ['task-detail-dialog.component.scss']
})
export class TaskDetailDialogComponent {
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

  constructor(public dialogRef: MatDialogRef<TaskDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.userList = [{name: 'dev1'}, {name: 'dev2'}, {name: 'dev3'}, {name: 'dev4'}, {name: 'dev5'}, {name: 'dev6'}];
    // this.roleList = [{name: 'PM'}, {name: 'Dev'}, {name: 'Test'}];
    this.demandListNotAssigned = [{name: '需求1'}, {name: '需求2'}, {name: '需求3'}];

    this.userLists = [
      {
        role: 'PM',
        members: ['PM1']
      },
      {
        role: '开发人员',
        members: ['开发1', '开发2', '开发3', '开发4']
      },
      {
        role: '测试人员',
        members: ['测试1', '测试2', '测试3', '测试4']
      }
    ];

    // this.selectUserList

    // this.addCheckedStatus(this.userList);
    // this.addCheckedStatus(this.roleList);
  }

  getSelectUsers() {
    this.selectUserList = this.selectUsers.value;
    console.log('ele', this.selectUsers);
  }

  // ngOnChanges(){
  //   this.selectUsers = new FormControl(this.users);
  // }

  addCheckedStatus(arrList) {
    return arrList.map(ele => {
      ele.checked = false;
      return ele;
    })
  }

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
