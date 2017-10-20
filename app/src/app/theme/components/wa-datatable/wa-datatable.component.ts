/**
 * Created by gaole on 2017/9/1.
 */
import {AfterViewInit, Component, Input, ViewChild} from "@angular/core";
import {GlobalState} from "../../../global.state";

@Component({
  selector:'wa-datatable',
  templateUrl:'./wa-datatable.component.html',
  styleUrls:['./wa-datatable.component.scss'],
  inputs: ['rows']
})

export class WaDatableComponent implements AfterViewInit{
  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;
  imgPath: string = '';
  baseUrl:string = 'http://cloud.testwa.com/'
  constructor() {
    console.log()
  }

  ngAfterViewInit() {
    console.log('rows: ' , this.rows)
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
    this.imgPath = `${this.baseUrl}${row.screenshotPath}`;
    return false;
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
    return false;
  }

}
