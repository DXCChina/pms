import {Injectable} from "@angular/core";
import {RequestOptions, Headers, Response} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {InterceptableHttp} from "ng-http-interceptor";
import {GlobalState} from "../../../global.state";

@Injectable()
export class ScriptManageService {

  private getScriptListUrl = this.Global.baseURL + '/api/script/page';
  private deleteScriptUrl = this.Global.baseURL + '/api/script/delete';
  private getContentUrl = this.Global.baseURL + '/api/script';
  private modifyContentUrl = this.Global.baseURL + '/api/script';

  constructor(private http: InterceptableHttp ,private Global: GlobalState) {

  }

  getScriptList(query: string): Promise<any> {
    let url = `${this.getScriptListUrl}?${query}`;
    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  deleteScript(ids: string[]): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = { ids };
    return this.http.post(this.deleteScriptUrl, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getContent(id: string): Promise<any> {
    let url = `${this.getContentUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)

  }

  modifyContent(content: string ,id : string): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = `${this.modifyContentUrl}/${id}`;
    let body = { content };
    return this.http.post(url, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  handleError(error: Response | any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
