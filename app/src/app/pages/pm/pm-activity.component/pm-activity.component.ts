import {Component, OnInit} from "@angular/core";
import {PeopleManageModel} from "../../../theme/components/pm-peoplemanage/pm-peoplemanage.model";
import {MatDialog} from "@angular/material";
import {CommonDeleteDialog} from "../../../theme/components/deleteDialog/deleteDialog.component";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PmActivityService} from "./pm-activity.service";
import * as moment from 'moment';

@Component({
  selector: 'pm-activity',
  templateUrl: './pm-activity.component.html',
  styleUrls: ['./pm-activity.component.scss'],
  providers: [PmActivityService]
})
export class PmActivityComponent implements OnInit {
  dataListModel: PeopleManageModel[];
  members: any;
  form: FormGroup;
  projectType: any[];
  projectDetail: any;
  searchList: any[] = [];

  constructor(public dialog: MatDialog, private router: Router, private service: PmActivityService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      detail: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required])
    });

    this.projectType = [
      { name: '短期项目', value: 'short-term'},
      { name: '长期项目', value: 'long-term'},
      { name: '运维项目', value: 'operation'},
    ];
    this.dataListModel = [
      { name: '姓名', value: 'username' },
      { name: '职位', value: 'role' },
      { name: '邮箱', value: 'email' },
    ];
  }

  ngOnInit() {
    this.getMember();
    this.getProjectDetail();
  }

  onSubmit(form: any) {
    form.status = 'active';
    form.startDate = this.dateSwitch(form.startDate);
    form.endDate = this.dateSwitch(form.endDate);
    this.updateProject(form);
  }

  dateSwitch(date: any) {
    return moment(new Date(date)).format('YYYY-MM-D h:mm:ss')
  }

  getMember() {
    this.service.getMember()
      .then(res => {
        this.members = res;
      }, err => {
        console.log(err);
      })
  }

  getProjectDetail() {
    this.service.getProjectDetail()
      .then(res => {
        this.projectDetail = res;
      }, err => {
        console.log(err);
      })
  }

  deleteProject() {
    let deleteDialog = this.dialog.open(CommonDeleteDialog, {
      height: '250px',
      width: '450px',
      data: '项目'
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        const deleteProject = {
          detail: this.projectDetail.detail,
          endDate: this.dateSwitch(this.projectDetail.endDate),
          startDate: this.dateSwitch(this.projectDetail.startDate),
          name: this.projectDetail.name,
          type: this.projectDetail.type,
          status: 'delete'
        };
        this.updateProject(deleteProject);
        this.router.navigate(['/pages/welcome']);
      } else {
        console.log('cancel delete');
      }
    })
  }

  updateProject(project: any) {
    this.service.updateProject(project)
      .then(res => {
        console.log(res)
      }, err => {
        console.log(err);
    });
  }

  fuzzyQuery(search: string) {
    this.service.fuzzyQuery(search)
      .then(res => {
        this.searchList = res.data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  memberAdd(id: string, role: string) {
    this.service.memberAdd(id, role)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      })
  }

  memberDelete(id: string) {
    this.service.memberDelete(id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  search(search: any) {
    if(search !== '') {
      this.fuzzyQuery(search);
    }
  }

  delete(data: any) {
    console.log('delete: ',data);
    this.memberDelete(data.id);
    this.getMember();
  }

  create(data: any) {
    console.log('create: ', data);
    this.memberAdd(data.id, data.role);
    this.getMember();
  }

}
