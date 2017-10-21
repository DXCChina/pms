import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ConfigEntity} from "./config.Entity";

@Component({
  selector:'w-dataList',
  styleUrls:['./w-dataList.scss'],
  template:`
    <div class="w-column-header" *ngIf="columnHeader">
      
      <wa-filter
        class="wa-filter"
        [placeHolder]="placeHolder"
        (outSearch)="exportSearch($event)">
      </wa-filter>
      
      <mat-checkbox
        color="primary"
        class="w-column-checkedAll"
        [checked]="checkedSwitch"
        (change)="isChecked($event)"
        [align]="end">
        全选
      </mat-checkbox>
    </div>
    <div class="wa-columnSpace" *ngIf="columnHeader"></div>
    <mat-nav-list style="margin-top: -11px; z-index: 0">
      <w-column
        [svgType]="svgType"
        [displayCommon]="displayCommon"
        [displayPeople]="displayPeople"
        [displayControl]="displayControl"
        [checkedAll]="checkedAll"
        [dataes]="dataes"
        *ngFor="let data of dataes"
        [data]="data"
        [configEntity]="configEntity"
        [class.selected]="isSelected(data)"
        (addData)="addData($event)"
        (deleteData)="deleteData($event)"
        (selected)="exportSelected($event)"
        (checkedData)="multipleSelection($event)">
        
      </w-column>
    </mat-nav-list>
  `
})
export class WDataListComponent implements OnInit {

  selectedData: any;
  checkedAll: boolean = false;
  multipleDataes: any[] = [];
  checkedSwitch: boolean = false;
  @Input() columnHeader: boolean = false;
  @Input() displayCommon: boolean;
  @Input() displayPeople: boolean;
  @Input() displayControl: string;
  @Input() dataes: any[] = [];
  @Input() svgType: string;
  @Input() placeHolder: string;
  @Input() configEntity: ConfigEntity;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  @Output() outCheckDataes: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() outSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() exportAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() exportDelete: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(){

  }

  addData(data: any){
    this.exportAdd.emit(data)
  }

  deleteData(data: any){
    this.exportDelete.emit(data)
  }

  exportSelected(selectedData: any){
    this.selectedData = selectedData;
    this.selected.emit(selectedData);
  }

  exportSearch(search: string){
    this.outSearch.emit(search)
  }

  isSelected(selectedData: any){
    if (!selectedData || !this.selectedData) {
      return false;
    }
    return selectedData[this.configEntity.id] === this.selectedData[this.configEntity.id];
  }

  isChecked() {

    this.checkedSwitch = !this.checkedSwitch;

    if (this.checkedSwitch) {
      this.multipleDataes = this.dataes.map(item => {
        item.checked = true
        return item
      })
      this.outCheckDataes.emit(this.multipleDataes);
    } else {
      this.multipleDataes = this.dataes.map(item => {
        item.checked = false
        return item
      })
      this.multipleDataes = []
      this.outCheckDataes.emit(this.multipleDataes);
    }

  }

  multipleSelection(data: any){

    this.dataes.map((item, index) => {
      item.id == data.id ? item.checked = data.checked : item
    })
    this.multipleDataes = this.dataes.filter(item => item.checked == true)
    this.multipleDataes.length == this.dataes.length ? this.checkedSwitch = true : this.checkedSwitch = false
    this.outCheckDataes.emit(this.multipleDataes);

  }
}

@Component({
  selector:'w-column',
  templateUrl:'./w-column.html',
  styleUrls:['./w-column.scss']
})
export class WColumnComponent {

  @Input() svgType: string;
  @Input() displayControl: string;
  @Input() displayCommon: boolean;
  @Input() displayPeople: boolean;
  @Input() checkedAll: boolean;
  @Input() dataes: any[] = [];
  @Input() data: any;
  @Input() configEntity: ConfigEntity;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  @Output() checkedData: EventEmitter<any> = new EventEmitter<any>();
  @Output() addData: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteData: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(){
    this.dataes = this.dataes.map(ele => {
      ele.checked = false
      return ele
    })
  }

  exportSelected(data :any){
    this.selected.emit(data)
  }

  exportCheckData(data: any){
    data.checked = !data.checked
    this.checkedData.emit(data);
  }

  add(data: any){
    this.addData.emit(data)
  }

  delete(data: any){
    this.deleteData.emit(data)
  }

}
