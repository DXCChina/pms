import {Injectable} from "@angular/core";
import {RequestOptions, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {InterceptableHttp} from "ng-http-interceptor";
import {GlobalState} from "../../../../global.state";

@Injectable()
export class ScriptCreateService {

  private scriptSaveUrl = this.Global.baseURL + '/api/script/save';

  constructor(private http: InterceptableHttp, private Global: GlobalState) {
  }


  addScripts( id: string, projectId: string, tag: string, description: string): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = {id, projectId, tag, description};
    return this.http.post(this.scriptSaveUrl, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
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
