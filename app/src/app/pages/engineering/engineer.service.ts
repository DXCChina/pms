import {Injectable} from "@angular/core";
import {InterceptableHttp} from "ng-http-interceptor";
import {GlobalState} from "../../global.state";
import {Observable} from "rxjs";

@Injectable()
export class EngineerService{
  private roleUrl = '/api/project/role';

  constructor(private _http: InterceptableHttp, private _Global: GlobalState){
    this.roleUrl = this._Global.baseURL + this.roleUrl;
  }

  getUserRole() : Promise<any>{
    let params = `projectId=${sessionStorage.getItem('projectId')}`;
    let url = `${this.roleUrl}?${params}`;

    return this._http.get(url)
      .toPromise()
      .then(this._Global.extractData)
      .catch(this._Global.handleError);
  }
}
