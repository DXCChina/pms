/**
 * Created by gaole on 2017/11/23.
 */
import { Injectable } from '@angular/core';
import { GlobalState } from '../../../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class PmDemandDetailService {
  demandUrl: string = this._global.baseURL + '/api/project/demand';
  demandDetailUrl: string = this._global.baseURL + '/api/project/demand/detail';
  demandUpdateUrl: string = this._global.baseURL + '/api/project/demand/update';

  constructor(private _global: GlobalState, private http: Http) { }

  newDemand(demandInfo:any): Promise<any> {
    return this.http.post(this.demandUrl, JSON.stringify(demandInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  reviewDemandDetail(id:string):Promise<any>{
    this.demandDetailUrl = `${this.demandDetailUrl}/${id}`;

    return this.http.get(this.demandDetailUrl)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  updateDemand(demandInfo:any):Promise<any>{
    return this.http.put(this.demandUpdateUrl, JSON.stringify(demandInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }
}
