import {NgModule} from "@angular/core";
import {NgaModule} from "../../theme/nga.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {routing} from "./pm.routing";
import {PmDashboardComponent} from "./pm-dashboard.component/pm-dashboard.component";
import {PmDemandComponent} from "./pm-demand.component/pm-demand.component";
import {PmComponent} from "./pm.component";
import {PmActivityComponent} from "./pm-activity.component/pm-activity.component";
import {

  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule
} from "@angular/material";
import {D_tComponent} from "./pm-demand.component/demand_task.model/d_t.component";
import {CreateDemandComponent} from "./pm-demand.component/create_demand/create_demand.component";


@NgModule({
  declarations: [
    PmComponent,
    PmDashboardComponent,
    PmDemandComponent,
    PmActivityComponent,

    PmPeoplemanageComponent,
    DemandSearchComponent
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
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatGridListModule,
    MatCommonModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [

  ],
  entryComponents:[
    CreateDemandComponent
  ]
})
export class PmModule {}
