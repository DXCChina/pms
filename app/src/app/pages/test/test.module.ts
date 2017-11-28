import {NgModule} from "@angular/core";
import {TestComponent} from "./test.component";
import {TestDashboardComponent} from "./test-dashboard/test-dashboard.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {TestActivityComponent} from "./test-activity/test-activity.component";
import {routing} from "./test.routing";
import {
  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule,
  MatProgressBarModule, MatToolbarModule,  MatTooltipModule
} from "@angular/material";
import { CaseDetailModalComponent } from './case-detail-modal/case-detail-modal.component';
import {ToasterModule} from "angular2-toaster";

@NgModule({
  declarations: [
    TestComponent,
    TestDashboardComponent,
    TestActivityComponent,
    CaseDetailModalComponent
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
  entryComponents:[
    CaseDetailModalComponent
  ]
})
export class TestModule {}
