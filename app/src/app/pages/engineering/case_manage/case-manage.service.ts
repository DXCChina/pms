/**
 * Created by gaole on 2017/7/31.
 */
import {Injectable} from '@angular/core';
import {Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {InterceptableHttp} from "ng-http-interceptor";
import {GlobalState} from "../../../global.state";

@Injectable()
export class CaseManageService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private caseListUrl: string = "/api/case/page";
  private deleteCasesUrl: string = "/api/case/delete";
  private scriptListUrl: string = "/api/script/list";
  private createCaseUrl: string = '/api/case/save';
  private modifyCaseUrl: string = '/api/case/modify';
  private caseDetailUrl: string = '/api/case/detail';

  projectId: string = sessionStorage.getItem("projectId");

  constructor(private _http: InterceptableHttp, public _state: GlobalState) {
    this.caseListUrl = this._state.baseURL + this.caseListUrl;
    this.deleteCasesUrl = this._state.baseURL + this.deleteCasesUrl;
    this.scriptListUrl = this._state.baseURL + this.scriptListUrl;
    this.createCaseUrl = this._state.baseURL + this.createCaseUrl;
    this.modifyCaseUrl = this._state.baseURL + this.modifyCaseUrl;
    this.caseDetailUrl = this._state.baseURL + this.caseDetailUrl;
  }

  getCaseList(params): Promise<any> {
    let url = `${this.caseListUrl}?${params}`;
    return this._http.get(url).toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getAllScripts(value: string): Promise<any> {
    this.scriptListUrl = `${this.scriptListUrl}?projectId=${this.projectId}&name=${value}`;

    return this._http.get(this.scriptListUrl).toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  deleteCases(ids: any[]): Promise<any> {
    return this._http.post(this.deleteCasesUrl, JSON.stringify({ids}), this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  createCase(caseInfo: any): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this._http.post(this.createCaseUrl, JSON.stringify(caseInfo), options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  updateCase(caseInfo: any): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this._http.post(this.modifyCaseUrl, JSON.stringify(caseInfo), options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  reviewDetail(id: string): Promise<any> {

    return this._http.get(`${this.caseDetailUrl}/${id}`).toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  saveScriptsInCase(caseInfo: any): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this._http.post(this.modifyCaseUrl, JSON.stringify(caseInfo), options)
      .toPromise()
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
