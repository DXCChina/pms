import {Routes, RouterModule} from "@angular/router";
import {TestComponent} from "./test.component";
import {TestDashboardComponent} from "./test-dashboard/test-dashboard.component";
import {TestActivityComponent} from "./test-activity/test-activity.component";
import {ModuleWithProviders} from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'dashboard',
        component: TestDashboardComponent,
        data:{isShowNav:true}
      },
      {
        path: 'activity',
        component: TestActivityComponent,
        data:{isShowNav:true}
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
