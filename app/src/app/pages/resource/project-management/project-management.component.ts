import {Component, ElementRef, EventEmitter, Inject, OnChanges, OnInit, Renderer2} from "@angular/core";
import {memberData, ProjectPages, Project, searchResult} from "./project.Entity";
import {ConfigEntity} from "../../../theme/components/w-dataList/config.Entity";
import {ProjectManageService} from "./projecgt-management.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {GlobalState} from "../../../global.state";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonDeleteDialog} from "../../common/deleteDialog/deleteDialog.component";
import {JhiEventManager} from "ng-jhipster";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'project-management',
  templateUrl: './project-management.html',
  styleUrls: ['./project-management.scss'],
  providers: [ProjectManageService]
})

export class ProjectManagementComponent implements OnInit, OnChanges {

  eventSubscriber: Subscription;
  configEntity: ConfigEntity;
  project: Project;
  showList: boolean = false;
  search: EventEmitter<string> = new EventEmitter<string>();
  checkedAll: boolean = false;
  dispalyDelete: boolean = true;
  contentSwitch: string = 'emptyCase';
  selectedData: ProjectPages;
  dataDetail: ProjectPages;
  memberInfo: memberData;
  searchDataes: searchResult;
  configList: ConfigEntity;
  toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: false,
      showCloseButton: true
    });

  checkedDataes: ProjectPages[] = [];

  page: number = 1;
  size: number = 15;
  sortField: string = 'id';
  sortOrder: string = 'asc';

  constructor(private ref: ElementRef, private _service: ProjectManageService, public dialog: MatDialog, private router: Router,
              private Global: GlobalState, private toasterService: ToasterService, private Renderer: Renderer2, private eventManager: JhiEventManager) {

    this.configEntity = {
      "name": "projectName",
      "description": "description",
      "id": "id"
    };

    this.configList = {
      "name": "username",
      "description": "",
      "id": "userId"
    };

    this.configEntity = JSON.parse(JSON.stringify(this.configEntity));
  }

  private getProjectListUrl = this.Global.baseURL + '/api/project/page';
  private deleteProjectsUrl = this.Global.baseURL + '/api/project/delete';
  private getProjectDetailUrl = this.Global.baseURL + '/api/project/detail';
  private getMembersUrl = this.Global.baseURL + '/api/project/members';
  private fuzzyQueryUrl = this.Global.baseURL + '/api/project/member/query';

  ngOnInit() {
    this.getProjectList();
    this.updateList();
  }

  ngOnChanges() {

  }

  updateList(){
    this.eventSubscriber = this.eventManager.subscribe('projectSave', () => {
      this.getProjectList();
      if(this.Global.createJudge.projectId){
        this.getProjectDetail(this.Global.createJudge.projectId)
      }
    })
  }

  getProjectDetail(id: string) {
    let url = `${this.getProjectDetailUrl}/${id}`;
    this._service.getProjectDetail(url)
      .then(res => {
          this.dataDetail = res.data
        }
        , error => {
          console.log(error)
        })
  }

  getMembers(data: ProjectPages) {
    let url = `${this.getMembersUrl}/${data.id}`;
    this._service.getMembers(url)
      .then(res => {
          this.memberInfo = res.data
        },
        error => {
          console.log(error)
        })
  }

  fuzzyQuery(username: string) {
    let params = [
      `projectId=${this.selectedData.id}`,
      `memberName=${username}`
    ].join('&');
    let url = `${this.fuzzyQueryUrl}?${params}`;
    this._service.fuzzyQuery(url)
      .then(res => {
          this.searchDataes = res.data
        }
        , error => {
          console.log(error)
        })
  }

  getProjectList() {
    let params = [
      `page=${this.page}`,
      `size=${this.size}`,
      `sortField=${this.sortField}`,
      `sortOrder=${this.sortOrder}`
    ].join('&');
    let url = `${this.getProjectListUrl}?${params}`;
    this._service.getProjectList(url)
      .then(res => {
          this.project = res;
          this.eventManager.broadcast({name: 'projectListModification', content: 'OK'});
        },
        err => {
          this.toasterService.pop('error', '列表更新失败', 'Item update failed!');
        }
      )
  }

  createProject() {
    this.Global.createJudge = {position: false, title: true, projectId: '', members: [], description: '', projectName: ''};
    this.router.navigate(['pages/resource/projectMan',{outlets:{popup: 'new'}}]);
    return false;
    // let dialogRef = this.dialog.open(ProjectCreateComponent, <MatDialogConfig>{
    //   height: "730px",
    //   width: "530px"
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.getProjectList()
    //   }
    // });
  };

  deleteInfo() {
    let dialogRef = this.dialog.open(CommonDeleteDialog, <MatDialogConfig>{
      height: "170px",
      width: "300px",
      data: '项目'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProjects()
      }
    });
  };

  deleteProjects() {
    this.dispalyDelete = true;
    let deleteSvg: HTMLElement = this.ref.nativeElement.querySelector('#deleteSvg');
    this.Renderer.setStyle(deleteSvg, 'fill', '#9e9e9e');
    if (this.checkedDataes) {
      let ids = [];
      this.checkedDataes.map(value => ids.push(value.id));
      if (ids.length !== 0) {
        this._service.deleteProjects(this.deleteProjectsUrl, ids)
          .then(res => {
              this.getProjectList();
              this.toasterService.pop('success', '项目删除成功', 'item deleted success!');
              this.checkedDataes = [];
            },
            error => {
              this.toasterService.pop('error', '项目删除失败', 'Item deletion failed!');
            });
      }
    }
  };

  editProject(info: ProjectPages, memberInfo: memberData[]) {
    let id = info.id;
    let members = [];
    memberInfo.forEach(value => members.push(value.username));
    this.Global.createJudge = {position: false, title: false, projectId: id, members: members, description: info.description, projectName: info.projectName};
    this.router.navigate(['/pages/resource/projectMan', {outlets: {popup: 'new'}}]);
  }

  peopleSearch(search: string) {
    if (search) {
      this.searchDataes = null;
      this.fuzzyQuery(search);
      this.showList = true;
    } else {
      this.showList = false;
      this.searchDataes = null;
    }
  }

  returnChecked(data: ProjectPages[]) {
    console.log('checkedData: ', data)
    this.checkedDataes = data;
    this.dispalyDelete = !Boolean(this.checkedDataes.length);
    let deleteSvg: HTMLElement = this.ref.nativeElement.querySelector('#deleteSvg');
    if (!this.dispalyDelete) {
      this.Renderer.setStyle(deleteSvg, 'fill', '#f44336');
    } else {
      this.Renderer.setStyle(deleteSvg, 'fill', '#9e9e9e');
    }
  }

  returnPageIndex(index: number) {
    this.page = index;
    this.getProjectList()
  }

  returnSelected(data: ProjectPages) {
    this.contentSwitch = 'commonCase';
    this.selectedData = data;
    this.getProjectDetail(data.id);
    this.getMembers(data)
  }

  returnSearch(search: string) {
    if (search != '') {

    }
  }
}

