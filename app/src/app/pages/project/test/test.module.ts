import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { routing } from './test.routing';

import {
  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule,
  MatProgressBarModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { ToasterModule } from 'angular2-toaster';

import { TestComponent } from './test.component';
import { TestDashboardComponent } from './test-dashboard/test-dashboard.component';
import { TestActivityComponent } from './test-activity/test-activity.component';
import { CaseDetailModalComponent } from './case-detail-modal/case-detail-modal.component';
import { TestTaskDetailDialogComponent } from './case-task-detail-dialog/task-detail-dialog.component';
import { TestResultDetailComponent } from './test-result-detail-dialog/test-result-detail-dialog.component';

@NgModule({
  declarations: [
    TestComponent,
    TestDashboardComponent,
    TestActivityComponent,
    CaseDetailModalComponent,
    TestTaskDetailDialogComponent,
    TestResultDetailComponent
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
    ToasterModule
  ],
  providers: [

  ],
  entryComponents: [
    CaseDetailModalComponent,
    TestTaskDetailDialogComponent,
    TestResultDetailComponent
  ]
})
export class TestModule { }
