import {Component, ElementRef, Inject} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {AppPages} from "../../app_manage/app.pagination.Entity";
import {TaskManageService} from "../task-manage.service";

@Component({
  selector: 'task_modify',
  templateUrl: './task_modify.html',
  styleUrls: ['./task_modify.scss'],
  providers: [TaskManageService]
})
export class TaskModifyComponent {

  form: FormGroup;
  taskName: AbstractControl;
  appName: AbstractControl;
  description: AbstractControl;
  tName: string;
  aName: string = '';
  chooseApp: AppPages;
  searchDataes: AppPages[];
  showNoItem: boolean = false;
  showAppList: boolean = false;

  constructor(private fb: FormBuilder, private ref: ElementRef, public dialogRef: MdDialogRef<TaskModifyComponent>
              ,@Inject(MD_DIALOG_DATA) public data: any, private service: TaskManageService){

    this.form = this.fb.group({
      "taskName": ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'description': [this.data.description]
    });

    this.taskName = this.form.controls['taskName'];
    this.description = this.form.controls['description'];
    this.tName = this.data.taskName;
    this.aName = this.data.app.name;
  }

  onSubmit(){
    let taskIds = [];
    this.data.taskCaseIds.forEach(value => taskIds.push(value.id));
    this.service.modifyTask(this.data.app.id, this.data.taskId, taskIds,this.taskName.value, this.description.value)
      .then( res => {
        this.dialogRef.close(true)
      }, err => {
        console.log(err)
      })
  }

  queryApps(query :string){
    if(query === ''){
      this.searchDataes = [];
      this.showNoItem = false;
      this.showAppList = false;
    }else{
      this.showAppList = true;
      this.service.queryApps(query)
        .then( res => {
          this.searchDataes = res.data;
          if(this.searchDataes.length == 0){
            this.showNoItem = true;
          }else{
            this.showNoItem = false;
          }
        }, err => console.log(err))
    }
  }

  chooseApps(app: AppPages){
    this.showAppList = false;
    this.data.app.id = app.id;
    console.log(this.data.app.id)
  }

}
