import {Routes, RouterModule} from "@angular/router";
import {WelcomeComponent} from "./welcome.component";
import {ModuleWithProviders} from "@angular/core";

export const routes: Routes = [
  {
    path:'',
    component:WelcomeComponent
  }
];

export const routing:ModuleWithProviders = RouterModule.forChild(routes);
