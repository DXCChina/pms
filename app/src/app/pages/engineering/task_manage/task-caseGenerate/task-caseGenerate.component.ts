import {Component, OnChanges} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalState} from "../../../../global.state";
import {routerDisplay} from "../../../common/animations/animations";
import {EnState} from "../../en.state";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppPages} from "../../app_manage/app.pagination.Entity";
import {TaskManageService} from "../task-manage.service";
import {CasePages} from "../../case_manage/caseList.model";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'task-caseGenerate',
  templateUrl: './task-caseGenerate.html',
  styleUrls: ['./task-caseGenerate.scss'],
  animations: [routerDisplay]
})
export class TaskCaseGenerateComponent implements OnChanges{

  form: FormGroup;
  taskName: AbstractControl;
  description: AbstractControl;
  search: string;
  showAppList: boolean = false;
  app_showNoItem: boolean = false;
  app_searchDataes: AppPages[];
  showCaseList: boolean = false;
  case_showNoItem: boolean = false;
  case_searchDataes: CasePages[];
  isSelectedCases: CasePages[] = [];
  TestCases: CasePages[] = [];
  chooseApp: AppPages;

  constructor(private router: Router, private enState: EnState ,private route: ActivatedRoute,
              private fb: FormBuilder, private service: TaskManageService ,private eventManager: JhiEventManager){

    this.isSelectedCases = this.enState.storageCases;
    this.form = this.fb.group({
      "taskName": ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      "description": ['']
    });
    this.taskName = this.form.controls['taskName'];
    this.description = this.form.controls['description'];
  }

  ngOnChanges(){
    console.log(this.isSelectedCases)
  }

  onSubmit(){
    let ids = [];
    this.isSelectedCases.forEach(value => ids.push(value.id));
    this.service.createTask(this.chooseApp.id, ids, sessionStorage.getItem('projectId'), this.taskName.value, this.description.value)
      .then(res => {
        this.eventManager.broadcast({name: 'taskCreate', content: 'ok'});
        this.router.navigate(['/pages/project/task',{outlets:{popup: null}}]);
        this.enState.storageCases = [];
      }, err => console.log(err))
  }

  // saveGenerate(){
    // this.router.navigate(['/pages/project/task',{outlets:{popup: null}}]);
    // this.enState.storageCases = [];
  // }

  cancelGenerate(){
    if(this.enState.storageCases.length === 0){
      this.router.navigate(['/pages/project/task'])
    }else{
      this.router.navigate(['/pages/project/case'])
    }
    this.enState.storageCases = [];
  }

  queryApps(query: string){
    if(query === ''){
      this.app_searchDataes = [];
      this.app_showNoItem = false;
      this.showAppList = false;
    }else{
      this.showAppList = true;
      this.service.queryApps(query)
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

  queryCases(query: string){
    if(query === ''){
      this.case_searchDataes = [];
      this.case_showNoItem = false;
      this.showCaseList = false;
    }else{
      this.showCaseList = true;
      this.service.queryCases(query)
        .then( res => {
          this.case_searchDataes = res.data;
          if(this.case_searchDataes.length == 0){
            this.case_showNoItem = true;
          }else{
            this.case_showNoItem = false;
          }
        }, err => console.log(err))
    }
  }

  chooseCases(cases: CasePages){
    this.showCaseList = false;
  }

  close(){
    this.showCaseList = false;
    this.showAppList = false;
  }

}


