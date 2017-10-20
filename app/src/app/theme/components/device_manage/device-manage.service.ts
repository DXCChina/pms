import {Injectable} from "@angular/core";
import {InterceptableHttp} from "ng-http-interceptor";
import {RequestOptions, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {GlobalState} from "../../../global.state";

@Injectable()
export class DeviceManageService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private deviceListUrl: string = "/device/available/page";
  private deviceInProjectUrl = this._state.baseURL + '/device/project/list';

  projectId: string = sessionStorage.getItem("projectId");

  constructor(private _http: InterceptableHttp, public _state: GlobalState) {
    this.deviceListUrl = this._state.baseURL + this.deviceListUrl;
  }

  getDeviceInProject(): Promise<any> {
    let params: string = `projectId=${sessionStorage.getItem('projectId')}`;
    let url = `${this.deviceInProjectUrl}?${params}`;
    return this._http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getDeviceList(params): Promise<any> {
    let url = `${this.deviceListUrl}?${params}`;
    return this._http.get(url).toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.description || JSON.stringify(body);
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }
}
