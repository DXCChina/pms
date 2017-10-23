/**
 * Created by gaole on 2017/8/4.
 */
import {Component, Input, EventEmitter, Output} from "@angular/core";
import {ConfigEntity} from "../w-dataList/config.Entity";
@Component({
  selector: 'wa-search',
  template: `<div>
           <div class="search">
              <input class="search-script-input" type="text" placeholder="搜索脚本" [(ngModel)]="scriptName">
              <button class="btn btn-secondary" type="button" (click)="getItems(scriptName)">Go!</button>
            </div>
            <div class="script-list-content">
              <div *ngFor="let item of items">
                <div class="script-content">
                  <span>{{item.name}}</span>
                  <a class="add-item" (click)="addItems(item)">+</a>
                </div>
              </div>
            </div>
</div>
`,
  styleUrls: ['./wa-search.component.scss']
})
export class WaSearchComponent {
  @Input() items;
  @Input() configEntity: ConfigEntity;
  @Output() onGetItems = new EventEmitter();
  @Output() onAddItems = new EventEmitter();

  scriptName: string = "";

  getItems(scriptName) {
    this.onGetItems.emit(scriptName);
  }

  addItems(item) {
    this.onAddItems.emit(item);
  }
}
