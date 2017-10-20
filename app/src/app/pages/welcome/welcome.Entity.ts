export class Welcome {
  constructor(
    public message: string,
    public data: WelcomeData,
    public code: number,
    public url: string
  ){}
}


export class WelcomeData {
  constructor(
    public stats: WelcomeStats,
    public projects: WelcomeProjects[],
    public devices: WelcomeDevices[],
  ){}
}

export class WelcomeStats {
  constructor(
    public project: number,
    public device: number
  ){}
}

export class WelcomeProjects {
  constructor(
    public id: string,
    public projectName: string,
    public createTime: string,
    public owerId: string,
    public owername: string,
    public description: string
  ){}
}


export class WelcomeDevices {
  constructor(
    public id: string,
    public userId: string,
    public deviceId: string,
    public d_type: string,
    public d_status: string,
    public d_cpuabi: string,
    public d_sdk: string,
    public d_width: string,
    public d_height: string,
    public d_osName: string,
    public d_density: string,
    public d_model: string,
    public d_brand: string,
    public d_version: string,
    public d_host: string,
    public createDate: number,
    public scope: number,
    public shareUsers: string[],
    public disable: boolean,
    public modifyDate: string
  ){}
}
