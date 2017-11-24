/**
 * Created by gaole on 2017/11/23.
 */
import { Injectable } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class PmDashboardService {
  demandUrl: string = this._global.baseURL + '/api/demand';

  constructor(private _global: GlobalState, private http: Http) { }

  newDemand(demandInfo:any): Promise<any> {
    return this.http.post(`${this.getUserListUrl}`, JSON.stringify(demandInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

}
