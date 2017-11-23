import {Component, Inject, ViewChild, Input} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger} from "@angular/material";

@Component({
  selector: 'task-detail-dialog',
  templateUrl:'task-detail-dialog.component.html',
  styleUrls:['task-detail-dialog.component.scss']
})
export class TaskDetailDialogComponent {
  @ViewChild('trigger') trigger: MatMenuTrigger;
  @ViewChild('userTrigger') userTrigger: MatMenuTrigger;
  // @Input('user-role-panel') panelClass: string;

  roleList: any = [];
  userList: any = [];
  selectRoleList: any = [];
  removable: boolean = true;
  selectable: boolean = true;
  selectUserList: any = [];

  demandListNotAssigned: any = [];
  demandListInTask: any = [];
  demandListCompletedInTask: any = [];
  progressValue: number = 0;

  constructor(public dialogRef: MatDialogRef<TaskDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userList = [{name:'dev1'}, {name:'dev2'}, {name:'dev3'}, {name:'dev4'}, {name:'dev5'}, {name:'dev6'}];
    this.roleList = [{name:'PM'}, {name:'Dev'}, {name:'Test'}];
    this.demandListNotAssigned = [{name:'需求1'}, {name:'需求2'}, {name:'需求3'}];

    this.addCheckedStatus(this.userList);
    this.addCheckedStatus(this.roleList);
  }

  addCheckedStatus(arrList){
    return arrList.map(ele=>{
      ele.checked = false;
      return ele;
    })
  }

  selectRoles(role,event){
    this.selectList(role, event, this.selectRoleList, this.removeRole)
  }

  selectUsers(user, event){
    this.selectList(user, event, this.selectUserList, this.removeUser);
  }

  selectList(user, event, selectUserList, fn){
    if(event.checked === true){
      user.checked = true;
      selectUserList.push(user);
    }else{
      fn(user);
    }
  }

  removeRole(role:any){
    this.remove(role, this.roleList);
  }

  removeUser(role: any): void {
    this.remove(role, this.userList);
  }

  remove(role, selectList){
    selectList.forEach(user => {
      if (user == role) {
        user.checked = false;
      }
    });
  }

  addDemandToTask(demand){
    this.demandListInTask.push(demand);
    let index = this.demandListNotAssigned.indexOf(demand);
    this.demandListNotAssigned.splice(index, 1);
    this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length*100;
  }

  toggleDemandStatus(demand,event){
    if(event.checked === true){
      this.demandListCompletedInTask.push(demand);
      this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length*100;
    }else {
      let index = this.demandListCompletedInTask.indexOf(demand);
      this.demandListCompletedInTask.splice(index, 1);
      this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length*100;
    }
  }

  deleteDemandInTask(demand){
    let index = this.demandListInTask.indexOf(demand);
    this.demandListInTask.splice(index, 1);
    this.demandListNotAssigned.push(demand);
    this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length*100;
  }
}
