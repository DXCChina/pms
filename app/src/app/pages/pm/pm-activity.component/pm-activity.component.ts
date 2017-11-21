import {Component} from "@angular/core";
import {PeopleManageModel} from "../pm-peoplemanage/pm-peoplemanage.model";

@Component({
  selector: 'pm-activity',
  templateUrl: './pm-activity.component.html',
  styleUrls: ['./pm-activity.component.scss']
})
export class PmActivityComponent {
  dataListModel: PeopleManageModel[];
  mockData: any[];
  constructor() {
    this.dataListModel = [
      { name: '姓名', value: 'name' },
      { name: '年龄', value: 'age' },
      { name: '性别', value: 'sex' },
      { name: 'ID', value: 'id' }
    ];
    this.mockData = [
      {
        name: 'jerry',
        id: 'sdfasfsf',
        age: 13,
        sex: 'man'
      },
      {
        name: 'tom',
        id: 'sfaswe',
        age: 85,
        sex: 'woman'
      },
      {
        name: 'tom',
        id: 'sfaswe',
        age: 85,
        sex: 'woman'
      }
    ]
  }
}
