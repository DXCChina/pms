import {Injectable} from "@angular/core";
import {GlobalState} from "../../global.state";
import {InterceptableHttp} from "ng-http-interceptor";

@Injectable()
export class WelcomeService {

  private welcomeInfoUrl = this.Global.baseURL + '/dashboard/platform';

  constructor(private http: InterceptableHttp, private Global: GlobalState){

  }

  welcomeInfo(): Promise<any> {
    return this.http.get(this.welcomeInfoUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

}
