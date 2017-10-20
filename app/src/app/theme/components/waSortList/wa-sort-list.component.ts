import {
  Component, Input, Output, EventEmitter, ViewChild, OnChanges
} from "@angular/core";
import {SortableComponent} from "ngx-bootstrap";

@Component({
  selector: 'wa-sort-list',
  templateUrl: './wa-sort-list.component.html',
  styleUrls: ['./wa-sort-list.component.scss']
})

export class WaSortListComponent {
  @ViewChild(SortableComponent) sortableComponent: SortableComponent;
  @Input('items') items: any[];
  @Output() itemsChange = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  // _differ: IterableDiffer<any>|null = null;

  constructor() {
  }

  // ngOnInit() {
  //   this._differ = this.differs.find(this.items).create(this.cd);
  // }
  //
  // ngDoCheck(): void {
  //   console.log(this._differ);
  //   if (this._differ) {
  //     const changes = this._differ.diff(this.items);
  //     console.log("changes");
  //     // if (changes) this._applyChanges(changes);
  //   }
  // }

  // ngOnChanges(){
  //   console.log("items",this.items);
  // }

  getNewItem(){
    this.itemsChange.emit(this.items);
  }

  delete(id) {
    this.items.splice(id, 1);
    this.itemsChange.emit(this.items);
    this.onDelete.emit();
    this.sortableComponent.writeValue(this.items);
  }
}
