// export class TaskPaginationEntity {
//
//   constructor(public message: string,
//               public data: TaskData,
//               public code: number,
//               public url: string) {
//   }
// }
// export class TaskData {
//   constructor(public records: Task[],
//               public totalRecords: number) {
//   }
// }
//
// export class Task {
//   constructor(public id: string,
//               public name: string,
//               public description: string) {
//   }
//
// }

import {CasePages} from "../case_manage/caseList.model";
import {AppPages} from "../app_manage/app.pagination.Entity";

export class Task {
  constructor(
    public message: string,
    public data: TaskData,
    public code: number,
    public url: string
  ){}
}

export class TaskData {
  constructor(
    public pages: TaskPages[],
    public total: number
  ){}
}

export class TaskPages {
  constructor(
    public id: string,
    public appId: string,
    public name: string,
    public projectId: string,
    public testcaseIds: string[],
    public creator: string,
    public createDate: string,
    public modifyDate: string
  ){}
}

export class TaskCreate {
  constructor(
    public appId: string,
    public caseIds: string[],
    public projectId: string
  ){}
}

export class SelectTask {
  constructor(
    public message: string,
    public data: SelectTaskData,
    public code: number,
    public url: string
  ){}
}

export class SelectTaskData {
  constructor(
    public id: string,
    public app: AppPages,
    public name: string,
    public description: string,
    public projectId: string,
    public creator: string,
    public createDate: string,
    public modifyDate: string,
    public testcaseVOs: CasePages[]
  ){}
}
