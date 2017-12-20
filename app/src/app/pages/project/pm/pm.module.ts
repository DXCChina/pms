import {NgModule} from '@angular/core';
import {NgaModule} from '../../../theme/nga.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {routing} from './pm.routing';

import {
  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule,
  MatProgressBarModule, MatToolbarModule, MatTooltipModule, MatFormFieldModule
} from '@angular/material';
import {ToasterModule} from 'angular2-toaster';
import {PmComponent} from './pm.component';
import {PmDashboardComponent} from './pm-dashboard.component/pm-dashboard.component';
import {PmActivityComponent} from './pm-activity.component/pm-activity.component';
import {TaskDetailDialogComponent} from './task-detail-dialog/task-detail-dialog.component';
import {DemandDetailDialogComponent} from './demand-detail-dialog/demand-detail-dialog.component';
import {TestResultDetailComponent} from './test-result-detail-dialog/test-result-detail-dialog.component';
import {DemandManageComponent} from './demand-manage/demand-manage.component';
import {DevSetManageComponent} from './dev-set-manage/dev-set-manage.component';
import {TestManageComponent} from './test-manage/test-manage.component';
import {TestSetManageComponent} from './test-set-manage/test-set-manage.component';
import {BugManageComponent} from './bug-manage/bug-manage.component';
import {DemandDetailComponent} from './demand-manage/demand-detail/demand-detail.component';
import {TableViewComponent} from "../table-view/table-view.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { DevSetDetailComponent } from './dev-set-manage/dev-set-detail/dev-set-detail.component';
import { TestCaseDetailComponent } from './test-manage/test-case-detail/test-case-detail.component';
import { BugDetailComponent } from './bug-manage/bug-detail/bug-detail.component';

@NgModule({
  declarations: [
    PmComponent,
    PmDashboardComponent,
    PmActivityComponent,
    TaskDetailDialogComponent,
    DemandDetailDialogComponent,
    TestResultDetailComponent,
    DemandDetailDialogComponent,
    DemandManageComponent,
    DevSetManageComponent,
    TestManageComponent,
    TestSetManageComponent,
    BugManageComponent,
    DemandDetailComponent,
    TableViewComponent,
    DevSetDetailComponent,
    TestCaseDetailComponent,
    BugDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,

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
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatGridListModule,
    MatCommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    ToasterModule,
    NgxDatatableModule
  ],
  providers: [],
  entryComponents: [
    TaskDetailDialogComponent,
    DemandDetailDialogComponent,
    TestResultDetailComponent
  ]
})
export class PmModule {
}
