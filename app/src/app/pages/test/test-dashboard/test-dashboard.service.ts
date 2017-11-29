/**
 * Created by gaole on 2017/11/27.
 */
import { Injectable } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class TestCaseDetailService {
  caseDetailUrl: string = this._global.baseURL + '/api/project/demand/detail';

  constructor(private _global: GlobalState, private http: Http) { }


  reviewCaseDetail(id:string):Promise<any>{
    let caseDetailUrl = `${this.caseDetailUrl}/${id}`;

    return this.http.get(caseDetailUrl)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }
}
