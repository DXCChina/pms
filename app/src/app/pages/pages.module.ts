import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {routing} from "./pages.routing";
import {NgaModule} from "../theme/nga.module";
import {AppTranslationModule} from "../app.translation.module";

import {Pages} from "./pages.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgJhipsterModule} from "ng-jhipster";
import {MatButtonModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
    BrowserAnimationsModule,
    MatButtonModule,
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
    }),
  ],
  declarations: [
    Pages,
  ],
  entryComponents:[
  ]
})
export class PagesModule {
}
