import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './dev.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule,
  MatProgressBarModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';

import { DevComponent } from './dev.component';
import { DevDashboardComponent } from './dev-dashboard/dev-dashboard.component';
import { DevActivityComponent } from './dev-activity/dev-activity.component';
import { DevTaskDetailDialogComponent } from './dev-task-detail-dialog/task-detail-dialog.component';
import { ToasterModule } from 'angular2-toaster';
// import { DemandDetailModalComponent } from './demand-detail-modal/demand-detail-modal.component';
import { TestResultDetailComponent } from './test-result-detail-dialog/test-result-detail-dialog.component';

@NgModule({
  declarations: [
    DevComponent,
    DevDashboardComponent,
    DevActivityComponent,
    DevTaskDetailDialogComponent,
    TestResultDetailComponent
    // DemandDetailModalComponent
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
    // DemandDetailModalComponent
    DevTaskDetailDialogComponent,
    TestResultDetailComponent
  ]
})
export class DevModule { }
