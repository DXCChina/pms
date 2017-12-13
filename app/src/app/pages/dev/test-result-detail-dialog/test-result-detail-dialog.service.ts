import { Injectable } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class TestResultService {
  testResultUrl: string = this._global.baseURL + '/api/testResult';

  constructor(private _global: GlobalState, private http: Http) { }

  reviewTestResult(id: number): Promise<any> {
    this.testResultUrl = `${this.testResultUrl}?testResultId=${id}`;

    return this.http.get(this.testResultUrl)
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
}
