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

  searchTestMember(projectId: number): Promise<any> {
    return this.http.get(`${this.testSetUrl}/searchMember?projectId=${projectId}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  searchTestCase(title: string, releaseId: number): Promise<any> {
    return this.http.get(`${this.testSetUrl}/searchCase?title=${title}&releaseId=${releaseId}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }
}
