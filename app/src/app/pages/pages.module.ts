import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {routing} from "./pages.routing";
import {NgaModule} from "../theme/nga.module";
import {AppTranslationModule} from "../app.translation.module";

import {Pages} from "./pages.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonDeleteDialog} from "./common/deleteDialog/deleteDialog.component";
import {NgJhipsterModule} from "ng-jhipster";
import {MdButtonModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
    BrowserAnimationsModule,
    MdButtonModule,
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
    }),
  ],
  declarations: [
    Pages,
    CommonDeleteDialog,
  ],
  entryComponents:[
    CommonDeleteDialog
  ]
})
export class PagesModule {
}
