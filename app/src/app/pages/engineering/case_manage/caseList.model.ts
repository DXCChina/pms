import {ProjectPages} from "../../resource/project-management/project.Entity";

export class Case {
  constructor(
    public message: string,
    public data: CaseData,
    public code: number,
    public url: string
  ){}
}

export class CaseData {
  constructor(
    public pages: CasePages,
    public total: number
  ){}
}

export class CasePages {
  constructor(
        public id: string,
        public description: string,
        public scripts: string[],
        public userId: string,
        public userName: string,
        public tag: string,
        public createDate: string,
        public name: string,
        public projectId: string,
        public projectName: string,
        public disable: boolean,
        public modifyDate: string
  ){}
}

export class CaseDetail {
  constructor(
    public message: string,
    public data: CaseData,
    public code: number,
    public url: string
  ){}
}

export class CaseDetailItem {
  constructor(
    public id: string,
    public description: string,
    public tag: string,
    public type: string,
    public userName: string,
    public createDate: string,
    public name: string,
    public projectName: string,
    public scriptVOs: any[]
  ){}
}
