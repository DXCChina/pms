import {Component, Inject, ViewChild, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger} from "@angular/material";
import {AbstractControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {ToasterService, ToasterConfig} from "angular2-toaster";
import {JhiEventManager} from "ng-jhipster";
import {CaseTaskDetailService} from "./task-detail-dialog.service";

@Component({
  selector: 'task-detail-dialog',
  templateUrl: 'task-detail-dialog.component.html',
  styleUrls: ['task-detail-dialog.component.scss'],
  providers: [CaseTaskDetailService]
})
export class TestTaskDetailDialogComponent implements OnInit {
  @ViewChild('trigger') trigger: MatMenuTrigger;
  @ViewChild('userTrigger') userTrigger: MatMenuTrigger;
  // @Input('user-role-panel') panelClass: string;

  removable: boolean = true;
  selectable: boolean = true;

  demandListInTask: any = [];
  demandListCompletedInTask: any = [];
  progressValue: number = 0;
  selectUserList: any;

  title: AbstractControl;
  detail: AbstractControl;
  cost: AbstractControl;
  startDate: AbstractControl;
  endDate: AbstractControl;
  status: AbstractControl;

  taskForm: FormGroup;
  taskInfoParams: any;
  taskInfo: any;

  projectId: number;
  activityId: number;
  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  constructor(public dialogRef: MatDialogRef<TestTaskDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder, private _service: CaseTaskDetailService, private toasterService: ToasterService,
              private eventManager: JhiEventManager) {
    this.projectId = Number(sessionStorage.getItem('projectId'));
    this.taskInfo = this.data.data;
    this.activityId = Number(this.data.data.id);
  }

  ngOnInit() {
    this.selectUserList = this.taskInfo.member.map(ele => {
      return {id: ele.id, name: ele.username};
    });

    this.demandListInTask = this.taskInfo.demand;
    this.demandListCompletedInTask = this.demandListInTask.filter(demand => demand.status === true);
    this.progressValue = this.demandListCompletedInTask.length / this.demandListInTask.length * 100;

    this.buildForm();
  }

  buildForm() {
    this.taskForm = this.fb.group({
      'title': [this.taskInfo.title, Validators.compose([Validators.required, Validators.minLength(4)])],
      'detail': [this.taskInfo.detail, Validators.compose([])],
      'cost': [this.taskInfo.cost, Validators.compose([])],
      'startDate': [new Date(this.taskInfo.startDate), Validators.compose([Validators.required])],
      'endDate': [new Date(this.taskInfo.endDate), Validators.compose([Validators.required])],
      'status': [this.taskInfo.status, Validators.compose([])],
    });

    this.title = this.taskForm.controls['title'];
    this.detail = this.taskForm.controls['detail'];
    this.cost = this.taskForm.controls['cost'];
    this.startDate = this.taskForm.controls['startDate'];
    this.endDate = this.taskForm.controls['endDate'];
    this.status = this.taskForm.controls['status'];

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

  onSubmit(data) {
    let doneDemandId = this.demandListCompletedInTask.map(demand => demand.id);
    this.taskInfoParams = Object.assign(
      {
        projectId: this.projectId,
        progress: this.progressValue,
        activityId: this.activityId,
        done_demand:doneDemandId
      },
      this.taskForm.value);
    this._service.updateTask(this.taskInfoParams)
      .then(res => {
        if(res.msg === 'ok'){
          this.eventManager.broadcast({name: 'ActivityListModification', content: 'OK'});
          this.toasterService.pop('ok', '活动修改成功');
          this.dialogRef.close();
        }else {
          this.toasterService.pop('error', res.msg);
        }
      })
  }

  cancel() {
    this.dialogRef.close();
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
}
