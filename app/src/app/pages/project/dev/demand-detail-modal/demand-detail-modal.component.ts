import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-demand-detail-modal',
  templateUrl: './demand-detail-modal.component.html',
  styleUrls: ['./demand-detail-modal.component.scss']
})
export class DemandDetailModalComponent implements OnInit {

  demandInfo:any;

  constructor(public dialogRef: MatDialogRef<DemandDetailModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.demandInfo = this.data
  }

  ngOnInit() {
  }

}
