import {NgModule} from "@angular/core";
import {routing} from "./welcome.routing";
import {WelcomeComponent} from "./welcome.component";
import {NgaModule} from "../../theme/nga.module";
import {MatCardModule} from "@angular/material";
import {HistoryProjectComponent} from "./historyProject/historyProject-component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ToasterModule} from "angular2-toaster";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    MatCardModule,
    ToasterModule
  ],
  declarations: [
    WelcomeComponent,
    HistoryProjectComponent,
  ],
  providers: [

  ]
})

export class WelcomeModule {

}
