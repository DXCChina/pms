import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserComponent} from "./user.component";
import {routing} from "./user.routing";


@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    UserComponent
  ],
  entryComponents:[

  ]
})
export class UserModule {

}
