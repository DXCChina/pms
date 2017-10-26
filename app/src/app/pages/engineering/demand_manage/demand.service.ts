import {Injectable} from "@angular/core";
import {GlobalState} from "../../../global.state";
import {Http} from "@angular/http";

@Injectable()
export class DemandService {
  createDemandUrl: string = this._global.baseURL + '/api/project/demand';
  demandListUrl: string = this._global.baseURL + '/api/demand/list';
  updateDemandUrl: string = this._global.baseURL + '/api/project/demand/update';
  demandDetailUrl: string = this._global.baseURL + '/api/project/demand/detail';
  demandSearchUrl: string = this._global.baseURL + '/api/demand';

  createTaskUrl: string = this._global.baseURL + '/api/demand/task';

  constructor(private _global: GlobalState, private http: Http) {

  }

  createDemand(ownerId: number,title: string, detail: string, level: string,
               status: string, startDate: any, endDate: any, progress: number, cost: number): Promise<any> {
    let projectId = Number(localStorage.getItem('projectId'));
    console.log({ownerId, projectId, title, detail, level, status, startDate, endDate, progress, cost})
    let body = JSON.stringify({ownerId, projectId, title, detail, level, status, startDate, endDate, progress, cost});
    return this.http.post(this.createDemandUrl, body, this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError)
  }

  getDemandList(page: number, size: number, sortField: string, sortOrder: string): Promise<any> {
    let params = [
      `ownerId=${localStorage.getItem('ownerId')}`,
      `projectId=${localStorage.getItem('projectId')}`,
      `sortField=${sortField}`,
      `sortOrder=${sortOrder}`,
      `page=${page}`,
      `size=${size}`
    ].join('&');
    return this.http.get(`${this.demandListUrl}?${params}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError)
  }

  updateDemand(data: any[]): Promise<any[]> {
    let body = JSON.stringify({data});
    return this.http.put(this.updateDemandUrl, body, this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError)
  }

  demandDetail(id: number): Promise<any> {
    return this.http.get(`${this.demandDetailUrl}/${id}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError)
  }

  demandFuzzySearch(title: string): Promise<any> {
    return this.http.get(`${this.demandSearchUrl}/${title}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError)
  }

  createTask(ownerId: number, demandId: number, title: string, detail: string, level: string,
               status: string, startDate: any, endDate: any, progress: number, cost: number): Promise<any> {
    let memberId = Number(localStorage.getItem('projectId'));
    console.log({ownerId, memberId, demandId, title, detail, level, status, startDate, endDate, progress, cost});
    let body = JSON.stringify({ownerId, memberId, demandId, title, detail, level, status, startDate, endDate, progress, cost});
    return this.http.post(this.createTaskUrl, body, this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError)
  }

}
