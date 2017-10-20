import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "./engineering.routing";
import {EngineeringComponent} from "./engineering.component";
import {CaseManageComponent} from "./case_manage/case-manage.component";
import {TaskManageComponent} from "./task_manage/task-manage.component";
import {ReportManageComponent} from "./report_manage/report-manage.component";
import {ScriptManageComponent} from "./script_manage/script-manage.component";

import {NgaModule} from "../../theme/nga.module";
import {CodemirrorModule} from 'ng2-codemirror';
import {ScriptCreateComponent} from "./script_manage/script_create/script.create.component";
import {
  MdTabsModule, MdButtonModule, MdDialogModule, MdTooltipModule, MdSelectModule,
  MdCardModule, MdCheckboxModule, MdInputModule, MdListModule, MdSortModule, MdTableModule, MdCommonModule,
  MdProgressBarModule, MdChipsModule
} from "@angular/material";
import {SortableModule}from 'ngx-bootstrap';
import {CaseCreateComponent} from "./case_manage/case_create/case-create.component";

import {UploadAppComponent} from "./app_manage/upload-app/upload-app.component";
import {AppManageComponent} from "./app_manage/app-manage.component";
import {ScriptDeleteComponent} from "./script_manage/script_delete/script.delete.component";
import {TaskCaseGenerateComponent} from "./task_manage/task-caseGenerate/task-caseGenerate.component";
import {EnState} from "./en.state";
import {TaskAppSearchComponent} from "./task_manage/task-caseGenerate/task-appSearch/task-appSearch.component";
import {TaskCaseSearchComponent} from "./task_manage/task-caseGenerate/task-caseSearch/task-caseSearch.component";
import {TaskModifyComponent} from "./task_manage/task_modify/task_modify.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {EngineerService} from "./engineer.service";
import {EngineerGuard} from "./engineer.guard";
import {CdkTableModule} from "@angular/cdk/table";
import {EDeviceManageComponent} from "./e-devices-manage/e-devices-manage.component";
import {ToasterModule} from "angular2-toaster";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {QuickDeployComponent} from "./dashboard/quickDeploy/quickDeploy.component";
import {ScriptSearchComponent} from "../common/scriptSearch/scriptSearch.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    CodemirrorModule,

    MdCommonModule,
    MdCheckboxModule,
    MdDialogModule,
    MdInputModule,
    MdSelectModule,
    MdCardModule,
    MdTabsModule,
    MdListModule,
    MdCheckboxModule,
    MdDialogModule,
    MdButtonModule,
    CdkTableModule,
    MdTableModule,
    MdSortModule,
    MdChipsModule,
    MdProgressBarModule,
    ReactiveFormsModule,
    MdInputModule,
    MdTooltipModule,
    ToasterModule,
    SortableModule.forRoot(),
    routing,
    NgxChartsModule,
    NgxDatatableModule
  ],
  declarations: [
    EngineeringComponent,
    EDeviceManageComponent,
    AppManageComponent,
    CaseManageComponent,
    TaskManageComponent,
    ReportManageComponent,
    ScriptManageComponent,
    UploadAppComponent,
    CaseCreateComponent,
    ScriptCreateComponent,
    ScriptDeleteComponent,
    TaskCaseGenerateComponent,
    TaskAppSearchComponent,
    TaskCaseSearchComponent,
    TaskModifyComponent,
    DashboardComponent,
    QuickDeployComponent,
    ScriptSearchComponent
  ],
  entryComponents: [
    ScriptManageComponent,
    ScriptCreateComponent,
    ScriptDeleteComponent,
    CaseCreateComponent,
    UploadAppComponent,
    TaskModifyComponent,
    QuickDeployComponent
  ],
  providers:[EnState, EngineerService,EngineerGuard]
})
export class EngineeringModule {

}
