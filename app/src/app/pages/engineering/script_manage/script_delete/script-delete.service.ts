import {Injectable} from "@angular/core";
import {RequestOptions, Headers, Response} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {InterceptableHttp} from "ng-http-interceptor";

@Injectable()
export class ScriptDeleteService {

  constructor(private http: InterceptableHttp) {
  }


  deleteScripts(url: string, ids: any[]): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, JSON.stringify({"ids": ids}), options).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      if (error.status > 200) {
        errMsg = '网络异常';
      } else {
        errMsg = '无法获取数据';
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }
}
