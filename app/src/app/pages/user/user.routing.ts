import { Routes, RouterModule }  from '@angular/router';

import { User } from './user.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: User
  }
];

export const routing = RouterModule.forChild(routes);
