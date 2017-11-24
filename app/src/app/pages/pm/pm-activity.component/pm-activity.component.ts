import {Component} from "@angular/core";
import {PeopleManageModel} from "../../../theme/components/pm-peoplemanage/pm-peoplemanage.model";
import {MatDialog} from "@angular/material";
import {CommonDeleteDialog} from "../../../theme/components/deleteDialog/deleteDialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'pm-activity',
  templateUrl: './pm-activity.component.html',
  styleUrls: ['./pm-activity.component.scss']
})
export class PmActivityComponent {
  dataListModel: PeopleManageModel[];
  datas: any[];
  searchList: any[] = [];

  constructor(public dialog: MatDialog, private router: Router) {
    this.dataListModel = [
      { name: '姓名', value: 'name' },
      { name: '职位', value: 'job' },
      { name: '邮箱', value: 'email' },
      { name: '时间', value: 'date' },
    ];
    this.datas = [
      {
        name: 'pm',
        job: 'pm',
        email: 'jerry@hpe.com',
        date: '2017/11/22',
        id: 'sdfasfsf',
      },
      {
        name: 'tom',
        job: 'dev',
        email: 'tom@hpe.com',
        date: '2017/11/23',
        id: 'sfaswe',
      },
      {
        name: 'diner',
        job: 'test',
        email: 'diner@hpe.com',
        date: '2017/11/21',
        id: 'sfaswe',
      }
    ];
  }

  deleteProject() {
    let deleteDialog = this.dialog.open(CommonDeleteDialog, {
      height: '250px',
      width: '450px',
      data: '项目'
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log('delete project');
        this.router.navigate(['/pages/welcome']);
      } else {
        console.log('cancel delete');
      }
    })
  }

  search(str: any) {
    if(str === 'qwer') {
      this.searchList = [
        {
          name: 'qwer',
          job: 'pm',
          email: 'qwer@hpe.com',
          date: '2017/11/23',
          id: 'sdfsdfsafas',
        },
        {
          name: 'QWER',
          job: 'dev',
          email: 'QWER@hpe.com',
          date: '2017/11/22',
          id: 'sddfsffsdd',
        }
      ];
    } else {
      this.searchList = [];
    }
  }

  delete(data: any) {
    console.log('delete: ',data)
  }

  create(data: any) {
    console.log('create: ', data)
  }
}
