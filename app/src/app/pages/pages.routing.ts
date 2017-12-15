import {Routes, RouterModule}  from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {Pages} from './pages.component';

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
        path: ':userType/release',
        loadChildren: "app/pages/project-manage/project-manage.module#ProjectManageModule",
        data:{isShowNav:true}
      },
      {path: '', redirectTo: 'welcome', pathMatch: 'full'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
