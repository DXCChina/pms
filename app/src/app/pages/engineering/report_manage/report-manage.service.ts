import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {GlobalState} from "../../../global.state";
import {InterceptableHttp} from "ng-http-interceptor";
// import {de} from "ngx-bootstrap/locale";

@Injectable()
export class ReportManageService {
  reportListUrl: string = "/api/exeTask/page";
  statisInfoUrl: string = "/api/exeTask/statis";
  stepTreeUrl: string = "/api/exeTask/taskTree";
  stepInfo: string = "/api/exeTask/scriptStep";

  constructor(private _http: InterceptableHttp,private _state:GlobalState) {
    this.reportListUrl = this._state.baseURL + this.reportListUrl;
    this.statisInfoUrl = this._state.baseURL + this.statisInfoUrl;
    this.stepTreeUrl = this._state.baseURL + this.stepTreeUrl;
    this.stepInfo = this._state.baseURL + this.stepInfo;
  }

  getStepInfo(deviceId: string,exeId: string, caseId: string, scriptId: string): Promise<any> {
    let params = [
      `deviceId=${deviceId}`,
      `exeId=${exeId}`,
      `caseId=${caseId}`,
      `scriptId=${scriptId}`
    ].join('&')
    let url = `${this.stepInfo}?${params}`
    return this._http.get(url).toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getStepTreeInfo(id: string): Promise<any> {
    let url = `${this.stepTreeUrl}?${'exeId=' + id}`
    return this._http.get(url).toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getAllReports(params): Promise<any> {
    let url = `${this.reportListUrl}?${params}`;
    return this._http.get(url).toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  loadStatisInfo(exeId:string):Promise<any>{
    let url = `${this.statisInfoUrl}?exeId=${exeId}`;
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

