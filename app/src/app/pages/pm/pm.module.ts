import {NgModule} from "@angular/core";
import {NgaModule} from "../../theme/nga.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {routing} from "./pm.routing";
import {PmDashboardComponent} from "./pm-dashboard.component/pm-dashboard.component";
import {PmDemandComponent} from "./pm-demand.component/pm-demand.component";
import {PmComponent} from "./pm.component";
import {PmActivityComponent} from "./pm-activity.component/pm-activity.component";
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatInputModule,
  MatListModule
} from "@angular/material";
import {PmPeoplemanageComponent} from "./pm-peoplemanage/pm-peoplemanage.component";

@NgModule({
  declarations: [
    PmComponent,
    PmDashboardComponent,
    PmDemandComponent,
    PmActivityComponent,
    PmPeoplemanageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,

    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule
  ],
  providers: [

  ]
})
export class PmModule {}
