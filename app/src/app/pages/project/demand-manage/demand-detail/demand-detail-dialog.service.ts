/**
 * Created by gaole on 2017/11/23.
 */
import { Injectable } from '@angular/core';
import { GlobalState } from '../../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class PmDemandDetailService {
  demandUrl: string = this._global.baseURL + '/api/project/demand';

  constructor(private _global: GlobalState, private http: Http) { }

  newDemand(demandInfo: any): Promise<any> {
    return this.http.post(this.demandUrl, JSON.stringify(demandInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  reviewDemandDetail(id: string): Promise<any> {
    return this.http.get(`${this.demandUrl}/${id}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  updateDemand(demandInfo: any): Promise<any> {
    return this.http.put(this.demandUrl, JSON.stringify(demandInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }
}
