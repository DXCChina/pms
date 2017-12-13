import {Component} from "@angular/core";
import {PeopleManageModel} from "../../../../theme/components/pm-peoplemanage/pm-peoplemanage.model";
import {Detail_memberService} from "../../../detail_member.service";
import {GlobalState} from "../../../../global.state";

@Component({
  selector: 'test-activity',
  templateUrl: './test-activity.component.html',
  styleUrls: ['./test-activity.component.scss']
})
export class TestActivityComponent {
 dataListModel: PeopleManageModel[];
 projectType: any[];
  projectDetail: any;
  memberList: any;

  constructor(private service: Detail_memberService, private Global: GlobalState) {
    this.dataListModel = [
      { name: '姓名', value: 'username' },
      { name: '职位', value: 'role' },
      { name: '邮箱', value: 'email' },
    ];
    this.projectType = [
      { name: '短期项目', value: 'short-term'},
      { name: '长期项目', value: 'long-term'},
      { name: '运维项目', value: 'operation'},
    ];
  }

  ngOnInit() {
    this.getProjectDetail();
    this.getMember();
  }

  getProjectDetail() {
    this.service.getProjectDetail()
      .then(res => {
        this.projectDetail = res;
      })
      .catch(err => {
        console.log(err)
      });
  }

  getMember() {
    this.service.getMember()
      .then(res => {
        this.memberList = res;
      })
      .catch(err => {
        console.log(err)
      })
  }

}
