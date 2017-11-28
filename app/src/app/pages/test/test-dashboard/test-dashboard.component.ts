import {Component} from "@angular/core";
import {CaseDetailModalComponent} from "../case-detail-modal/case-detail-modal.component";
import {TestCaseDetailService} from "./test-dashboard.service";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'test-dashboard',
  templateUrl: './test-dashboard.component.html',
  styleUrls: ['./test-dashboard.component.scss'],
  providers: [TestCaseDetailService]
})
export class TestDashboardComponent {
  constructor(private _service: TestCaseDetailService, private dialog: MatDialog) {
  }

  // reviewDemandDetail(id) {
  //   this._service.reviewCaseDetail(id)
  //     .then(res => {
  //       let dialogRef = this.dialog.open(CaseDetailModalComponent, {
  //         width: '750px',
  //         height: '61vh',
  //         data: {data: res.data}
  //       });
  //       dialogRef.afterClosed().subscribe(result => {
  //         console.log('The dialog was closed');
  //       });
  //     });
  // }

  addCase() {
    let dialogRef = this.dialog.open(CaseDetailModalComponent, {
      width: '750px',
      height: '61vh',
      data: {mode: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showCaseDetail() {
    //todo caseInfo应作为参数传进来
    let caseInfo = {
      "demandId": 1,
      "demandTittle": "需求1111",
      "detail": "测试用例1",
      "expect": "1",
      "id": 1,
      "input": "0",
      "name": "测试用例1",
      "projectId": 1,
      "type": "功能测试"
    };
    let dialogRef = this.dialog.open(CaseDetailModalComponent, {
      width: '750px',
      height: '61vh',
      data: {mode: 'update', caseInfo: caseInfo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
