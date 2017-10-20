import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from "@angular/router";
import {EngineerService} from "./engineer.service";
import {GlobalState} from "../../global.state";
/**
 * Created by gaole on 2017/8/29.
 */

@Injectable()
export class EngineerGuard implements CanActivateChild {
  constructor(private engineerService: EngineerService, private Global: GlobalState) {

  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.engineerService.getUserRole().then(res => {
        if (res.data.role == 0 || res.data.role == -1) {
          this.Global.userRoleInPro = res.data.role;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}

