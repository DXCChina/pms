/**
 * Created by zuoho on 2017/7/25.
 */
export class Script {
  constructor(
    public message: string,
    public data: ScriptPages,
    public code: number,
    public url: string
  ) {}
}

export class ScriptData {
  constructor(
    public pages: ScriptPages,
    public total: number
  ){}
}

export class ScriptPages {
  constructor(
    public id: string,
    public name: string,
    public tag: string,
    public description: string,
    public aliasName: string,
    public size: string,
    public createDate: string,
    public userName: string,
    public type: string,
    public md5: string,
    public modifyDate: string,
    public modifyUserName: string,
    public projectName: string
  ){}
}

export class ScriptContent {
  constructor(
    public message: string,
    public data: string,
    public code: number,
    public url: string,
  ){}
}

export class ScriptType {
  constructor(
    public size: number,
    public id: string,
    public type: string
  ){
  }
}
