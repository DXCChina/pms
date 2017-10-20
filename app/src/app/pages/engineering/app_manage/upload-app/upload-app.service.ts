import {Injectable} from "@angular/core";
import {InterceptableHttp} from "ng-http-interceptor";
import {GlobalState} from "../../../../global.state";

@Injectable()
export class UploadAppService {
  private saveAppUrl = this.Global.baseURL + '/api/app/save';

  constructor(private _http: InterceptableHttp ,private Global: GlobalState) {
  }

  saveApp(appId: string, projectId: string, version: string, description: string): Promise<any> {

    let body = JSON.stringify({ appId, projectId, version, description});
    return this._http.post(this.saveAppUrl, body, this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

}
