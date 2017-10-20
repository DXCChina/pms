
export class App {
  constructor(
    public message: string,
    public data: AppData,
    public code: number,
    public url: string,
  ){}
}

export class AppData {
  constructor(
    public pages:AppPages[],
    public total: number,
  ){}
}

export class AppPages {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public aliasName: string,
    public packageName: string,
    public activity: string,
    public sdkVersion: string,
    public targetSdkVersion: string,
    public version: string,
    public type: string,
    public projectId: string,
    public project: string,
    public md5: string,
    public size: string,
    public createDate: string,
    public userId: string,
    public userName: string
  ){}
}
