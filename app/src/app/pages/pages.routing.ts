import {Routes, RouterModule}  from '@angular/router';
import {Pages} from './pages.component';
import {ModuleWithProviders} from '@angular/core';
import {ReleaseManageComponent} from "./release-manage/release-manage.component";

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      {
        path: 'welcome',
        loadChildren: "app/pages/welcome/welcome.module#WelcomeModule"
      },
      {
        path: 'user',
        loadChildren: "app/pages/user/user.module#UserModule"
      },
      {
        path: 'project',
        loadChildren: "app/pages/project/project.module#ProjectModule",
      },
      {
        path: 'release',
        loadChildren: "app/pages/project-manage/project-manage.module#ProjectManageModule",
        data:{isShowNav:true}
      },
      {path: '', redirectTo: 'welcome', pathMatch: 'full'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
