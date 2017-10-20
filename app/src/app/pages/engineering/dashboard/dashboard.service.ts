import {Injectable} from "@angular/core";
import {GlobalState} from "../../../global.state";
import {InterceptableHttp} from "ng-http-interceptor";

@Injectable()
export class DashboardService {

  getDashborderInfoUrl = this.Global.baseURL + '/dashboard/project?projectId=' + sessionStorage.getItem('projectId');
  quickDeployUrl = this.Global.baseURL + '/dashboard/project/quickDeploy';

  constructor(private Global: GlobalState, private http: InterceptableHttp){

  }

  getInfo(): Promise <any> {
    return this.http.get(this.getDashborderInfoUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  quickDeploy(appId: string, scripts: string[], devices: string[]): Promise <any> {
    let projectId = sessionStorage.getItem('projectId');
    let body = { appId, scripts, devices, projectId};
    return this.http.post(this.quickDeployUrl, body, this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }
}
