import {Routes} from "@angular/router";
import {TestComponent} from "./test.component";
import {TestDashboardComponent} from "./test-dashboard/test-dashboard.component";
import {TestActivityComponent} from "./test-activity/test-activity.component";

export const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'dashboard',
        component: TestDashboardComponent
      },
      {
        path: 'activity',
        component: TestActivityComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
