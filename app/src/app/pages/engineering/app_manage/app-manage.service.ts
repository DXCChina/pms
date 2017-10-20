import {Injectable} from "@angular/core";
import {Headers, RequestOptions, Response} from "@angular/http";
import {InterceptableHttp} from "ng-http-interceptor";
import {GlobalState} from "../../../global.state";

@Injectable()
export class AppManageService {

  private getAllAppsUrl = this.Global.baseURL + '/api/app/page';
  private deleteAppUrl = this.Global.baseURL+'/api/app/delete';

  constructor(private _http: InterceptableHttp , private Global: GlobalState) {
  }

  getAllApps(url: string): Promise<any>{
    let URL = `${this.getAllAppsUrl}?${url}`;
    return this._http.get(URL)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  deleteApps(ids: string[]):Promise<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = { ids };
    return this._http.post( this.deleteAppUrl, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
