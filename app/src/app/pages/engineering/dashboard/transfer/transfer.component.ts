import { Component, OnChanges, ElementRef, ViewChild, Renderer2, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'transfer-component',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnChanges {
  @Input() selectedIdArr: any;
  @Input() allOpt: any[];
  @Output() changeOpt: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('allList')
  allListEl: ElementRef;
  @ViewChild('selectList')
  selectListEl: ElementRef;

  selectedName: any;
  addName: any;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges() {
    this.initData()
  }

  initData() {
    if (this.selectedIdArr instanceof Array && this.allOpt instanceof Array) {
      this.selectedName = [];
      this.addName = [];
      for (let a = 0; a < this.allOpt.length; a++) {
        if (this.selectedIdArr.indexOf(this.allOpt[a].id) >= 0) {
          this.selectedName.push({
            name: this.allOpt[a].username,
            id: this.allOpt[a].id
          });
        } else {
          this.addName.push({
            name: this.allOpt[a].username,
            id: this.allOpt[a].id
          });
        }
      }
    }
  }

  deleteOpt() {
    let a = this.selectListEl['selectedOptions'].selected.map(el => {
      return parseInt(el.value)
    })
    a.forEach(el => {
      this.selectedIdArr.indexOf(el)==-1?null:this.selectedIdArr.splice(this.selectedIdArr.indexOf(el),1);
    });
    this.initData()
    this.selectListEl['deselectAll']()
    this.allListEl['deselectAll']()
        
    this.changeOpt.emit(this.selectedIdArr)
  }

  addOpt() {
    let a = this.allListEl['selectedOptions'].selected.map(el => {
      return parseInt(el.value)
    })
    a.forEach(el => {
      this.selectedIdArr.indexOf(el)==-1?this.selectedIdArr.push(el):null;
    });
    this.initData()
    this.selectListEl['deselectAll']()
    this.allListEl['deselectAll']()    

    this.changeOpt.emit(this.selectedIdArr)
  }

}
