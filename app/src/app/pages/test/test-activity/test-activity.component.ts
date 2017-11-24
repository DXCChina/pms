import {Component} from "@angular/core";
import {PeopleManageModel} from "../../../theme/components/pm-peoplemanage/pm-peoplemanage.model";

@Component({
  selector: 'test-activity',
  templateUrl: './test-activity.component.html',
  styleUrls: ['./test-activity.component.scss']
})
export class TestActivityComponent {
  dataListModel: PeopleManageModel[];
  datas: any[];

  constructor() {
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

}
