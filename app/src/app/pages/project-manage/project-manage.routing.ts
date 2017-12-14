/**
 * Created by gaole on 2017/12/14.
 */
import {RouterModule, Routes} from "@angular/router";
import {ProjectManageComponent} from "./project-manage.component";
import {ModuleWithProviders} from "@angular/core";
import {ReleaseManageComponent} from "./release-manage/release-manage.component";
import {ProjectViewComponent} from "./project-view/project-view.component";

export const routes: Routes = [
  {
    path: '',
    component: ProjectManageComponent,
    children: [
      {
        path: 'view',
        component: ReleaseManageComponent,
        data:{isShowNav:true}
      },
      {
        path: 'project-view',
        component: ProjectViewComponent,
        data:{isShowNav:true}
      },
      {
        path:'',
        redirectTo:'view',
        pathMatch:'full'
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

