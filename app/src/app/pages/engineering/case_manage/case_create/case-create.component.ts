import {Component, OnInit} from "@angular/core";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ConfigEntity} from "../../../../theme/components/w-dataList/config.Entity";
import {CaseManageService} from "../case-manage.service";
import {ToasterService} from "angular2-toaster";
import {Router} from "@angular/router";
import {EnState} from "../../en.state";
import {routerDisplay} from "../../../common/animations/animations";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'case-create',
  templateUrl: './case-create.component.html',
  styleUrls: ['./case-create.component.scss'],
  animations:[routerDisplay]
})
export class CaseCreateComponent implements OnInit {
  public newForm: FormGroup;

  public caseName: AbstractControl;
  public caseDescription: AbstractControl;
  public tag: AbstractControl;

  public caseNameInfo: string = '';
  public caseDescriptionInfo: string = '';
  public caseTagInfo: string = '';

  public configSearchEntity: ConfigEntity;

  public scriptsInCase: any[] = [];
  public scriptList: any[] = [];

  constructor(private fb: FormBuilder, private _service: CaseManageService,
              private toasterService: ToasterService, private router: Router, private _enState: EnState,
              private eventManager: JhiEventManager) {
    // this.configSearchEntity = this.data.newCaseInfo.configSearchEntity;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    if (this._enState.enCaseInfo.status === 'update') {
      this.caseNameInfo = this._enState.enCaseInfo.data.name;
      this.caseDescriptionInfo = this._enState.enCaseInfo.data.description;
      this.scriptsInCase = this._enState.enCaseInfo.data.scriptVOs;
      this.caseTagInfo = this._enState.enCaseInfo.data.tag;
    }else if(this._enState.enCaseInfo.status === 'new' && this._enState.enCaseInfo.create === 'able'){
      this.caseNameInfo = "";
      this.caseDescriptionInfo = "";
      this.caseTagInfo = "";
      this.scriptsInCase = [];
    } else {
      this.caseNameInfo = "";
      this.caseDescriptionInfo = "";
      this.caseTagInfo = "";
      this.scriptsInCase = this._enState.enCaseInfo.data;
    }
    this.newForm = this.fb.group({
      "caseName": [this.caseNameInfo, Validators.compose([Validators.required, Validators.minLength(1)])],
      "caseDescription": [this.caseDescriptionInfo, Validators.compose([Validators.required, Validators.minLength(1)])],
      "tag": [this.caseTagInfo, Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.caseName = this.newForm.controls['caseName'];
    this.caseDescription = this.newForm.controls['caseDescription'];
    this.tag = this.newForm.controls['tag'];
  }

  onSubmit() {
    let caseInfo = {
      name: this.caseName.value,
      description: this.caseDescription.value,
      tag: this.tag.value,
      projectId: sessionStorage.getItem("projectId"),
      scriptIds: this.scriptsInCase?this.scriptsInCase.map(script => script.id):[]
    };

    if(this._enState.enCaseInfo.status === 'update'){
      caseInfo["id"] = this._enState.enCaseInfo.data.id;
      this._service.updateCase(caseInfo)
        .then(res => {
            this.eventManager.broadcast({name: 'caseListModification2', content: 'OK'});
            this.toasterService.pop('success', '案例修改成功', 'case update success!');
            this.router.navigate(['/pages/project/case', {outlets: {popup: null}}]);
          },
          error => {
            this.toasterService.pop('success', '案例修改失败', 'case update fail!');
          }
        );
    }else{
      this._service.createCase(caseInfo)
        .then(res => {
            this.eventManager.broadcast({name: 'caseListModification', content: 'OK'});
            this.toasterService.pop('success', '案例创建成功', 'case create success!');
            this.router.navigate(['/pages/project/case', {outlets: {popup: null}}]);
          },
          error => {
            this.toasterService.pop('success', '案例创建失败', 'case create fail!');
          }
        );
    }

    // this._enState.enCaseInfo = {status:'',data:[]};
  }

  cancel() {
    if (this.scriptsInCase.length === 0 || this._enState.enCaseInfo.status === 'update') {
      this.router.navigate(['/pages/project/case', {outlets: {popup: null}}]);
    } else {
      this.router.navigate(['/pages/project/script', {outlets: {popup: null}}]);
    }
    // this._enState.enCaseInfo = {status:'',data:[]};
    return false
  }

  getAllScriptList(value) {
    this._service.getAllScripts(value)
      .then(res => {
        this.scriptList = res.data;
      })
  }

  addItem(item) {
    this.scriptsInCase.push(item);
    this.scriptsInCase = this.scriptsInCase.concat();
  }
}
