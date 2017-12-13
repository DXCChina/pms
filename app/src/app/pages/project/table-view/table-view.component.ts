import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  providers: []
})
export class TableViewComponent {

  rows: Observable<any[]>;

  columns = [
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor() {
    this.rows = Observable.create((subscriber) => {
      this.fetch((data) => {
        subscriber.next(data.splice(0, 15));
        subscriber.next(data.splice(15, 30));
        subscriber.complete();
      });
    });

    // Rx.DOM.ajax({ url: '/products', responseType: 'json'}).subscribe()
    // this.rows = Observable.from(rows);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://swimlane.github.io/ngx-datatable/assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
