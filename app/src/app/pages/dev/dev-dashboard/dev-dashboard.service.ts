/**
 * Created by gaole on 2017/11/27.
 */
/**
 * Created by gaole on 2017/11/23.
 */
import { Injectable } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class DevDemandDetailService {
  demandDetailUrl: string = this._global.baseURL + '/api/project/demand/detail';

  constructor(private _global: GlobalState, private http: Http) { }


  reviewDemandDetail(id:string):Promise<any>{
    this.demandDetailUrl = `${this.demandDetailUrl}/${id}`;

    return this.http.get(this.demandDetailUrl)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }
}
