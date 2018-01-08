import { Injectable } from '@angular/core';
import { GlobalState } from '../../../../global.state';
import { Http } from '@angular/http';
@Injectable()
export class CaseDetailModalService {

  private demandListMatchStrUrl = this.Global.baseURL + '/api/project/demand';
  private caseUrl = this.Global.baseURL + '/api/project/case';
  private caseDetailUrl = this.Global.baseURL + '/api/project/case/detail';

  constructor(private Global: GlobalState, private http: Http) {

  }

  newCase(caseInfo): Promise<any> {
    return this.http.post(this.caseUrl, JSON.stringify(caseInfo), this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  updateCase(caseInfo): Promise<any> {
    return this.http.put(this.caseUrl, JSON.stringify(caseInfo), this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  searchDemandList(title, projectId): Promise<any> {
    return this.http.get(`${this.demandListMatchStrUrl}?title=${title}&projectId=${projectId}`)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  reviewDetail(id): Promise<any> {
    return this.http.get(`${this.caseDetailUrl}/${id}`)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }
}
