import {NgModule} from "@angular/core";
import {DevComponent} from "./dev.component";
import {DevDashboardComponent} from "./dev-dashboard/dev-dashboard.component";
import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {FormsModule} from "@angular/forms";
import {DevActivityComponent} from "./dev-activity/dev-activity.component";
import {routing} from "./dev.routing";
import {
  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule,
  MatProgressBarModule, MatToolbarModule,  MatTooltipModule
} from "@angular/material";

@NgModule({
  declarations: [
    DevComponent,
    DevDashboardComponent,
    DevActivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    MatToolbarModule
  ],
  providers: [

  ]
})
export class DevModule {}
