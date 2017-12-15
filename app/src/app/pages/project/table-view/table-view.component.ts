import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewModel } from './view.model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  providers: []
})
export class TableViewComponent {

  viewModel = ViewModel;

  viewName = '啊哈~';

  rows = [];

  temp = [];

  columns = [
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Age' },
    { name: 'City', prop: 'address.city' },
    { name: 'State', prop: 'address.state' }
  ];

  @ViewChild('table') tableEl: any;

  constructor() {
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://swimlane.github.io/ngx-datatable/assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
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

}
// http://swimlane.github.io/ngx-datatable/
