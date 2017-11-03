import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "./engineering.routing";
import {EngineeringComponent} from "./engineering.component";
import {NgaModule} from "../../theme/nga.module";
import {CodemirrorModule} from 'ng2-codemirror';
import {
  MatTabsModule, MatButtonModule, MatDialogModule, MatTooltipModule, MatSelectModule,
  MatCheckboxModule, MatInputModule, MatListModule, MatSortModule, MatTableModule, MatCommonModule,
  MatProgressBarModule, MatChipsModule, MatCardModule, MatExpansionModule, MatGridListModule, MatDatepickerModule,
  MatNativeDateModule, MAT_DATE_LOCALE, MatSliderModule
} from "@angular/material";
import {SortableModule}from 'ngx-bootstrap';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {EngineerService} from "./engineer.service";
import {CdkTableModule} from "@angular/cdk/table";
import {ToasterModule} from "angular2-toaster";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ScriptSearchComponent} from "../common/scriptSearch/scriptSearch.component";
import {DemandManageComponent} from "./demand_manage/demand-manage.component";
import {ReportManageComponent} from "./report_manage/report-manage.component";
import {CreateDemandComponent} from "./demand_manage/create_demand/create_demand.component";
import {CKEditorModule} from "ng2-ckeditor";
import {DemandService} from "./demand_manage/demand.service";
import {D_tComponent} from "./demand_manage/demand_task.model/d_t.component";
import {DemandSearchComponent} from "../common/demandSearch/demandSearch.component";
import {TransferComponent} from "./dashboard/transfer/transfer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    CKEditorModule,
    CodemirrorModule,
    MatCommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    CdkTableModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatTooltipModule,
    ToasterModule,
    SortableModule.forRoot(),
    routing,
    NgxChartsModule,
    NgxDatatableModule
  ],
  declarations: [
    EngineeringComponent,
    DashboardComponent,
    ScriptSearchComponent,
    ReportManageComponent,
    DemandManageComponent,
    CreateDemandComponent,
    D_tComponent,
    DemandSearchComponent,
    TransferComponent
  ],
  entryComponents: [
    CreateDemandComponent
  ],
  providers:[
    EngineerService,
    {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
    DemandService
  ]
})
export class EngineeringModule {

}
