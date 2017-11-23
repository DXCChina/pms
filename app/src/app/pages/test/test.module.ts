import {NgModule} from "@angular/core";
import {TestComponent} from "./test.component";
import {TestDashboardComponent} from "./test-dashboard/test-dashboard.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {TestActivityComponent} from "./test-activity/test-activity.component";
import {routing} from "./test.routing";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    TestComponent,
    TestDashboardComponent,
    TestActivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    // RouterModule,
    routing
  ],
  providers: [

  ]
})
export class TestModule {}
