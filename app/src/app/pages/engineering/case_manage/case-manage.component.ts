import {Component, ElementRef, Renderer2, OnInit} from "@angular/core";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {Router} from "@angular/router";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {JhiEventManager} from "ng-jhipster";
import {Subscription} from "rxjs";

import {Case, CaseDetailItem, CasePages} from "./caseList.model";
import {CaseManageService} from "./case-manage.service";
import {ConfigEntity} from "../../../theme/components/w-dataList/config.Entity";
import {CommonDeleteDialog} from "../../common/deleteDialog/deleteDialog.component";
import {GlobalState} from "../../../global.state";
import {EnState} from "../en.state";


@Component({
  selector: "en-cm",
  templateUrl: './case-manage.component.html',
  styleUrls: ["./case-manage.component.scss"],
  providers: [CaseManageService]
})

export class CaseManageComponent implements OnInit {
  configEntity: ConfigEntity;
  configSearchEntity: ConfigEntity;
  case: Case;
  selectCase: CaseDetailItem;
  selectCaseId: '';
  checkedDataes: any[] = [];
  scriptList: any[] = [];
  scriptsInCase: any[] = [];
  contentSwitch: string = 'emptyCase';
  dispalyDelete: boolean = true;

  page: number = 1;
  size: number = 15;
  sortField: string = 'id';
  sortOrder: string = 'asc';

  toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: false,
      showCloseButton: true
    });

  eventSubscriber: Subscription;

  controlBtn: boolean = false;

  constructor(public dialog: MdDialog, private _service: CaseManageService, private router: Router, private Global: GlobalState,
              private toasterService: ToasterService, private Renderer: Renderer2, private ref: ElementRef, private enState: EnState,
              private eventManager: JhiEventManager) {
    this.configEntity = {
      "name": "name",
      "description": "description",
      "id": "id"
    };
    this.configSearchEntity = {
      "name": "scriptName",
      "description": "scriptInfo",
      "id": "scriptId"
    };

  }

  ngOnInit() {
    this.getCaseList();
    this.registerChangeInCases();
    this.registerChangeInCases2();
  }

  registerChangeInCases() {
    this.eventSubscriber = this.eventManager.subscribe('caseListModification', (response) => {
      this.getCaseList();
    });
  }

  registerChangeInCases2() {
    this.eventSubscriber = this.eventManager.subscribe('caseListModification2', (response) => {
      this.getCaseList();
      this.reviewDetail(this.selectCaseId);
    });
  }

  saveCase(selectCase: CaseDetailItem) {
    let caseInfo = {
      id: selectCase.id,
      name: selectCase.name,
      description: selectCase.description,
      tag: selectCase.tag,
      projectId: sessionStorage.getItem("projectId"),
      scriptIds: selectCase.scriptVOs ? this.scriptsInCase.map(script => script.id) : []
    };
    this._service.updateCase(caseInfo)
      .then( res => {
        if(res.message === 'ok'){
          this.reviewDetail(this.selectCase.id);
          this.toasterService.pop('success', '案例修改成功', 'case modified success!');
        } else {
          this.toasterService.pop('success', res.message, 'case modified success!');
        }
      }, err => {
        console.log(err)
      });
  }

  cancelCase(id: string) {
    this.reviewDetail(id)
  }

  getCaseList() {
    let params = [
      `page=${this.page}`,
      `size=${this.size}`,
      `sortField=${this.sortField}`,
      `sortOrder=${this.sortOrder}`
    ].join('&');
    this._service.getCaseList(params)
      .then(res => {
        this.case = res;
      })
  }

  deleteScript(items) {
    this.scriptsInCase = items;
  }

  addItem(item) {
    this.scriptsInCase.push(item);
    this.scriptsInCase = this.scriptsInCase.concat();
    // this.controlBtn = false;
  }

  getAllScriptList(value) {
    this._service.getAllScripts(value)
      .then(res => {
        this.scriptList = res.data;
      })
  }

  deleteDialog() {
    let dialogRef = this.dialog.open(CommonDeleteDialog, <MdDialogConfig>{
      height: "170px",
      width: "300px",
      data: '案例'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCases();
      }
    });
  }

  deleteCases() {
    this.dispalyDelete = true;
    let deleteSvg: HTMLElement = this.ref.nativeElement.querySelector('#deleteSvg');
    let generateSvg: HTMLElement = this.ref.nativeElement.querySelector('#generateSvg');
    this.Renderer.setStyle(deleteSvg, 'fill', '#9e9e9e');
    this.Renderer.setStyle(generateSvg, 'fill', '#9e9e9e');
    if (this.checkedDataes) {
      let ids = [];
      this.checkedDataes.map(value => ids.push(value.id));
      this._service.deleteCases(ids)
        .then(res => {
            this.getCaseList();
            this.toasterService.pop('success', '案例删除成功', 'case deleted success!');
          },
          error => {
            this.toasterService.pop('error', '案例删除失败', 'case deletion failed!');
          });
    }
  }

  updateCase() {
    this.enState.enCaseInfo.status = "update";
    this.router.navigate(['/pages/project/case', {outlets:{popup:['new']}}]);
    return false;
  }

  returnChecked(data: CasePages[]) {
    this.checkedDataes = data;
    this.dispalyDelete = !Boolean(this.checkedDataes.length);
    let deleteSvg: HTMLElement = this.ref.nativeElement.querySelector('#deleteSvg');
    let generateSvg: HTMLElement = this.ref.nativeElement.querySelector('#generateSvg');
    if (!this.dispalyDelete) {
      this.Renderer.setStyle(deleteSvg, 'fill', '#f44336');
      this.Renderer.setStyle(generateSvg, 'fill', '#4bb134');
    } else {
      this.Renderer.setStyle(deleteSvg, 'fill', '#9e9e9e');
      this.Renderer.setStyle(generateSvg, 'fill', '#9e9e9e');
    }
  }

  returnPageIndex(index: number) {
    // this.page = index;
    // // console.log(index)
    // this.getCaseList()
  }

  returnSelected(selectCase) {
    this.selectCaseId = selectCase.id;
    this.reviewDetail(this.selectCaseId);
  }

  reviewDetail(id: string) {
    this._service.reviewDetail(id)
      .then(res => {
        this.enState.enCaseInfo.data = this.selectCase = res.data;
        this.scriptsInCase = this.selectCase.scriptVOs;
        this.contentSwitch = 'commonCase';
      })
  }

  createCase() {
    this.enState.enCaseInfo.status = 'new';
    this.enState.enCaseInfo.create = 'able';
  }

  save() {
    let caseInfo = {
      id: this.selectCase.id,
      name: this.selectCase.name,
      projectId: sessionStorage.getItem("projectId"),
      scriptIds: this.scriptsInCase.map(script => script.id)
    };
    this._service.saveScriptsInCase(caseInfo)
      .then(res => {
        // this.controlBtn = true;
      });
    return false;
  }

  cancel() {
    this.reviewDetail(this.selectCase.id);
    // this.controlBtn = true;

    return false;
  }

  taskGenerate(){
    // this.enState.caseJudge = false;
    this.router.navigate(['/pages/project/task',{outlets:{popup: 'newTask'}}]);
    this.enState.storageCases = this.checkedDataes;
  }

  controlButton() {
    // this.controlBtn = false;
  }
}
