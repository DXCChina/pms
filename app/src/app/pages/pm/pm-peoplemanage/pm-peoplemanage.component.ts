import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild,
  ViewChildren
} from "@angular/core";
import {PeopleManageModel} from "./pm-peoplemanage.model";
import {add} from "./pm-peoplemanage.animation";

@Component({
  selector: 'pm-people-manage',
  templateUrl: './pm-peoplemanage.component.html',
  styleUrls: ['./pm-peoplemanage.component.scss'],
  animations: [add]
})
export class PmPeoplemanageComponent implements AfterViewInit{
  dataListModel: PeopleManageModel[] = [];
  post: any = 'pm';
  data: any[] = [];
  showField: string = 'name';
  inputName: string = '';

  searchList: any[] = [];
  showNoItem: boolean = false;
  showList: boolean = false;
  state: string;
  positions: any[];

  choosedData: any;

  @ViewChild('search')
  search: ElementRef;
  constructor(private ref: ElementRef, private Renderer: Renderer2) {
        this.dataListModel = [
      { name: '姓名', value: 'name' },
      { name: '职位', value: 'job' },
      { name: '邮箱', value: 'email' },
      { name: '时间', value: 'date' },
    ];
    this.data = [
      {
        name: 'jerry',
        job: 'PM',
        email: 'jerry@hpe.com',
        date: '2017/11/22',
        id: 'sdfasfsf',
      },
      {
        name: 'tom',
        job: 'DEV',
        email: 'tom@hpe.com',
        date: '2017/11/23',
        id: 'sfaswe',
      },
      {
        name: 'diner',
        job: 'TEST',
        email: 'diner@hpe.com',
        date: '2017/11/21',
        id: 'sfaswe',
      }
    ];
    this.state = 'inactive';
    this.positions = [
      { name: '项目经理', value: 'pm' },
      { name: '开发人员', value: 'dev' },
      { name: '测试人员', value: 'test' }
    ];
  }

  ngAfterViewInit() {
    let width = (100 / this.dataListModel.length).toString().substr(0, 4) + '%';
    let cellList = this.ref.nativeElement.querySelectorAll('.item-cell');
    cellList.forEach(cell => {
      this.Renderer.setStyle(cell, 'width', width);
    });
  }

  delete(item: any) {
    console.log('delete: ', item);
    this.data = this.data.filter(data => data !== item);
  }

  create() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.choosedData.job = this.post;
    this.data.push(this.choosedData);
    this.searchList = [];
    this.showList = false;
    this.inputName = '';
  }

  changeState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  closeAdd() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.searchList = [];
    this.showList = false;
    this.inputName = '';
  }

  emitSearch(str: any) {
    console.log('search: ', str);

    if(str === 'qwer') {
      this.showList = true;
      this.showNoItem = false;
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
    } else {
      this.showList = false;
      this.showNoItem = false;
      this.searchList = [];
    }
  }

  chooseData(data: any) {
    this.choosedData = data;
    this.inputName = data.name;
  }
}
