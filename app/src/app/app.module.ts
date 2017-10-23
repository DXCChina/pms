import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import {PagesModule} from "./pages/pages.module";
import {RegisterModule} from "./register/register.module";
import {LoginModule} from "./login/login.module";
import {HttpInterceptorModule} from "ng-http-interceptor";
import {APP_BASE_HREF} from "@angular/common";

// Application wide providers
const APP_PROVIDERS = [
  GlobalState
];

export type StoreType = {
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    // HttpClientModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    Ng2BootstrapModule,
    HttpInterceptorModule.noOverrideHttp(),
    routing,
    PagesModule,
    LoginModule,
    RegisterModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    {provide: APP_BASE_HREF, useValue: '/'}
  ]
})

export class AppModule {

  constructor() {
  }
}
