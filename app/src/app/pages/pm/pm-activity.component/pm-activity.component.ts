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
  searchList: any[] = [];
  showList: boolean = false;
  showNoItem: boolean = false;
  inputName: string = '';
  constructor() {

  }

  search(str: any) {
    console.log(str);
    if (str === 'qwer') {
      this.searchList = [
        {
          name: 'qwer',
          job: 'PM',
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
      this.showList = true;
    } else {
      this.searchList = [];
      // this.showList = true;
      // this.showNoItem = true;
    }
  }
  choose(data: any) {
    console.log('choose: ', data);
    this.inputName = data.name;
  }

  select(data: any) {
    console.log('select: ', data)
  }
}
