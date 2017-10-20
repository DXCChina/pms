export class Dashboard {
  constructor(
    public message: string,
    public data: DashboardData,
    public code: number,
    public url: string
  ){}
}

export class DashboardData {
  constructor(
    public stats: DataStats,
    public runningTask: any[],
    public recentFinishedTask: any[]
  ){}
}

export class DataStats {
  constructor(
    public device: number,
    public app: number,
    public script: number,
    public testcase: number,
    public task: number,
    public report: number
  ){}
}
