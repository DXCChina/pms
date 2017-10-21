import {NgModule} from "@angular/core";
import {routing} from "./welcome.routing";
import {WelcomeComponent} from "./welcome.component";
import {NgaModule} from "../../theme/nga.module";
import {MatCardModule} from "@angular/material";
import {HistoryProjectComponent} from "./historyProject/historyProject-component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MyDeviceComponent} from "./myDevice/myDevice-component";
import {ToasterModule} from "angular2-toaster";
import {WelcomeService} from "./welcome.service";
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
    MyDeviceComponent
  ],
  providers: [
    WelcomeService
  ]
})

export class WelcomeModule {

}
