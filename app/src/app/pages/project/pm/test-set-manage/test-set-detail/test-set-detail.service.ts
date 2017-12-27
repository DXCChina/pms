import { Injectable } from '@angular/core';
import { GlobalState } from '../../../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class TestSetService {
  testSetUrl: string = this._global.baseURL + '/api/testSet';

  constructor(private _global: GlobalState, private http: Http) { }

  newTestSet(testSetInfo: any): Promise<any> {
    return this.http.post(this.testSetUrl, JSON.stringify(testSetInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  reviewTestSet(id: number): Promise<any> {

    return this.http.get(`${this.testSetUrl}?testSetId=${id}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  updateTestSet(testSetInfo: any): Promise<any> {
    return this.http.put(this.testSetUrl, JSON.stringify(testSetInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }
}
