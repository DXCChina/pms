import {Injectable} from '@angular/core';
import {GlobalState} from '../../../../global.state';
import {Http} from '@angular/http';

@Injectable()
export class TestResultService {
  testResultUrl: string = this._global.baseURL + '/api/testResult';

  constructor(private _global: GlobalState, private http: Http) {
  }

  newTestResult(testResultInfo: any): Promise<any> {
    return this.http.post(this.testResultUrl, JSON.stringify(testResultInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  reviewTestResult(id: number): Promise<any> {
    return this.http.get(`${this.testResultUrl}?testResultId=${id}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  updateTestResult(testResultInfo: any): Promise<any> {
    return this.http.put(this.testResultUrl, JSON.stringify(testResultInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  searchTestSet(releaseId: number): Promise<any> {
    return this.http.get(`${this.testResultUrl}/searchSet?releaseId=${releaseId}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  searchTestCase(setId: number, releaseId: number): Promise<any> {
    return this.http.get(`${this.testResultUrl}/searchCase?setId=${setId}&releaseId=${releaseId}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }
}
