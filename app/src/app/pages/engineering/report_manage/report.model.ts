/**
 * Created by gaole on 2017/7/28.
 */
export class Report {
  constructor(reportName: string, reportId: string, reportInfo: number) {
  }
}

export class ReportStaty {
  constructor(
    public message: string,
    public data: StatyInfo,
    public code: number,
    public url: string
  ){}
}

export class StatyInfo {
  constructor(
    public cpuStaty: ColumnData[],
    public cpuLine: LineData[],
    public scriptStaty: ScriptStaty[],
    public rawLine: LineData[],
    public appStaty: AppStaty,
    public ramStaty: ColumnData[]
  ){}
}

export class ColumnData {
  constructor(
    public model: string,
    public brand: string,
    public value: number
  ){}
}

export class LineData {
  constructor(
    public series: Series[],
    public model: string,
    public brand: string
  ){}
}

export class Series {
  constructor(
    public name: string,
    public value: number
  ){}
}

export class ScriptStaty {
  constructor(
    public total: number,
    public failedNum: number,
    public successNum: number,
    public model: string,
    public deviceId: string,
    public brand: string
  ){}
}

export class AppStaty {
  constructor(
    public id: string,
    public name: string,
    public aliasName: string,
    public packageName: string,
    public activity: string,
    public sdkVersion: string,
    public targetSdkVersion: string,
    public version: string,
    public type: string,
    public path: string,
    public projectId: string,
    public projectName: string,
    public userId: string,
    public username: string,
    public disable: boolean,
    public md5: string,
    public size: string,
    public description: string,
    public createDate: any,
    public modifyDate: any
  ){}
}
