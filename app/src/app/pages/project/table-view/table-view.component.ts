import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TableViewService } from './table-view.service';
import { ViewModel } from './view.model';
import { MockData } from './mock-data';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  providers: [TableViewService]
})
export class TableViewComponent {

  // 项目ID
  projectId: string;

  viewModel = ViewModel;

  viewType = 'demand';

  rows = [];

  temp = [];

  columns;

  @ViewChild('table') tableEl: any;

  constructor(private router: Router, private service: TableViewService) {

    this.projectId = sessionStorage.getItem('projectId');

    if (!this.projectId) {
      this.router.navigate(['/welcome']);
    } else {
      this.columns = this.viewModel[this.viewType].columns;
      this.initData();
    }

  }

  initData() {
    // const req = new XMLHttpRequest();
    // req.open('GET', `http://swimlane.github.io/ngx-datatable/assets/data/100k.json`);

    // req.onload = () => {
    // const data  = JSON.parse(req.response);

    // cache our list
    // this.temp = [...data];

    // push our inital complete list
    // this.rows = data;
    // };

    // req.send();

    this.service
      .getViewData(this.projectId, this.viewModel[this.viewType].detailUrl)
      .then(res => {
        res.map(date => {
          date.name = date.title ? date.title : date.name;
        });

        // cache our list
        this.temp = [...res];

        // push our inital complete list
        this.rows = res;
      })
      .catch(err => console.log(err));

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.tableEl.offset = 0;
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.tableEl.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  addItem() {
    console.log('add', this.viewType);
  }

  ViewDetail(name) {
    console.log('show', name);
  }

}
