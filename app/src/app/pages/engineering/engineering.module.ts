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
  MatProgressBarModule, MatChipsModule, MatCardModule, MatExpansionModule, MatGridListModule
} from "@angular/material";
import {SortableModule}from 'ngx-bootstrap';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {EngineerService} from "./engineer.service";
import {EngineerGuard} from "./engineer.guard";
import {CdkTableModule} from "@angular/cdk/table";
import {ToasterModule} from "angular2-toaster";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {QuickDeployComponent} from "./dashboard/quickDeploy/quickDeploy.component";
import {ScriptSearchComponent} from "../common/scriptSearch/scriptSearch.component";
import {DemandManageComponent} from "./demand_manage/demand-manage.component";
import {ReportManageComponent} from "./report_manage/report-manage.component";
import {CreateDemandComponent} from "./demand_manage/create_demand/create_demand.component";
import {CKEditorModule} from "ng2-ckeditor";

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
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    CdkTableModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatTooltipModule,
    ToasterModule,
    SortableModule.forRoot(),
    routing,
    NgxChartsModule,
    NgxDatatableModule,
  ],
  declarations: [
    EngineeringComponent,
    DashboardComponent,
    QuickDeployComponent,
    ScriptSearchComponent,
    ReportManageComponent,
    DemandManageComponent,
    CreateDemandComponent
  ],
  entryComponents: [
    QuickDeployComponent,
    CreateDemandComponent
  ],
  providers:[EngineerService,EngineerGuard]
})
export class EngineeringModule {

}
