import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {InterceptableHttp} from "ng-http-interceptor";
import {SelectTask, Task} from "./task.Entity";
import {GlobalState} from "../../../global.state";
import {CasePages} from "../case_manage/caseList.model";

@Injectable()
export class TaskManageService{

  private getTaskListUrl = this._Global.baseURL + '/api/task/page';
  private queryTaskUrl = this._Global.baseURL + '/api/case/list';
  private queryAppsUrl = this._Global.baseURL + '/api/app/list';
  private createTaskUrl = this._Global.baseURL + '/api/task/save';
  private deleteTaskUrl = this._Global.baseURL + '/api/task/delete';
  private getDetailUrl = this._Global.baseURL + '/api/task/detail';
  private modifyTaskUrl = this._Global.baseURL + '/api/task/modify';
  private deployTaskUrl = this._Global.baseURL + '/api/task/run';

  constructor(private _http: InterceptableHttp, private _Global: GlobalState){}

  getTaskList(page: number, size: number, sortField: string, sortOrder: string): Promise<Task>{
      let params = [
        `page=${page}`,
        `size=${size}`,
        `sortField=${sortField}`,
        `sortOrder=${sortOrder}`,
        `projectId=${sessionStorage.getItem('projectId')}`
      ].join('&');
      let url = `${this.getTaskListUrl}?${params}`;
      return this._http.get(url)
        .toPromise()
        .then(this._Global.extractData)
        .catch(this._Global.handleError);

  }

  queryCases(query: string):Promise<any>{
    let params = [
      `projectId=${sessionStorage.getItem('projectId')}`,
      `name=${query}`
    ].join('&');
    let url = `${this.queryTaskUrl}?${params}`;
    return this._http.get(url)
      .toPromise()
      .then(this._Global.extractData)
      .catch(this._Global.handleError);
  }

  queryApps(query: string): Promise<any> {
    let params = [
      `projectId=${sessionStorage.getItem('projectId')}`,
      `appName=${query}`
    ].join('&');
    let url = `${this.queryAppsUrl}?${params}`;
    return this._http.get(url)
      .toPromise()
      .then(this._Global.extractData)
      .catch(this._Global.handleError)
  }

  createTask(appId: string, caseIds: string[], projectId: string, name: string, description: string): Promise<any> {
    let body = JSON.stringify({appId, caseIds, projectId, name, description});
    return this._http.post(this.createTaskUrl, body, this._Global.options)
      .toPromise()
      .then(this._Global.extractData)
      .catch(this._Global.handleError)
  }

  deleteTasks(ids: string[]): Promise<any> {
    let body = { ids };
    return this._http.post(this.deleteTaskUrl, body, this._Global.options)
      .toPromise()
      .then(this._Global.extractData)
      .catch(this._Global.handleError)
  }

  getTaskDetail(id: string): Promise<SelectTask> {
    let url = `${this.getDetailUrl}/${id}`;
    return this._http.get(url)
      .toPromise()
      .then(this._Global.extractData)
      .catch(this._Global.handleError)
  }

  modifyTask(appId: string, taskId: string, caseIds: string[], name: string, description: string): Promise<any> {
    let body = { appId, caseIds,taskId ,name, description};
    return this._http.post(this.modifyTaskUrl ,body ,this._Global.options)
      .toPromise()
      .then(this._Global.extractData)
      .catch(this._Global.handleError)
  }

  deployTask(appId: string, caseIds: string[], deviceIds: string[], taskId: string): Promise<any> {
    let projectId = sessionStorage.getItem('projectId');
    let body = {appId, caseIds, deviceIds, projectId, taskId};
    return this._http.post(this.deployTaskUrl, body, this._Global.options)
      .toPromise()
      .then(this._Global.extractData)
      .catch(this._Global.handleError)
  }
}
