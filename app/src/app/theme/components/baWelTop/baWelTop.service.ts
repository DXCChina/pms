/**
 * Created by gaole on 2017/7/31.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {InterceptableHttp} from "ng-http-interceptor";
import {Project} from "../../../pages/resource/project-management/project.Entity";

@Injectable()
export class BaWelTopService {

  constructor(private _http: InterceptableHttp) {
  }

  findProjectList(url: string): Promise<Project> {
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
