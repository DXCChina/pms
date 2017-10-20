import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {EngineeringComponent} from "./engineering.component";
import {AppManageComponent} from "./app_manage/app-manage.component";
import {CaseManageComponent} from "./case_manage/case-manage.component";
import {TaskManageComponent} from "./task_manage/task-manage.component";
import {ReportManageComponent} from "./report_manage/report-manage.component";
import {ScriptManageComponent} from "./script_manage/script-manage.component";
import {TaskCaseGenerateComponent} from "./task_manage/task-caseGenerate/task-caseGenerate.component";
import {CaseCreateComponent} from "./case_manage/case_create/case-create.component";
import {EngineerGuard} from "./engineer.guard";
import {EDeviceManageComponent} from "./e-devices-manage/e-devices-manage.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: EngineeringComponent,
    canActivateChild: [EngineerGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'device', component: EDeviceManageComponent
      },
      {
        path: 'app', component: AppManageComponent
      },
      {
        path: 'script', component: ScriptManageComponent
      },
      {
        path: 'case', component: CaseManageComponent,
        children:[
          {
            path:'new',
            component:CaseCreateComponent,
            outlet:'popup'
          }
        ]
      },
      {
        path: 'task', component: TaskManageComponent,
        children: [
          {
            path: 'newTask',
            component: TaskCaseGenerateComponent,
            outlet: 'popup'
          }
        ]
      },
      {
        path: 'report', component: ReportManageComponent
      },
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      }
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
