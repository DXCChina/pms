/**
 * Created by XD on 2017/7/18.
 */

export class  Project {
  message: string;
  data: ProjectData;
  code: number;
  url: string;
  constructor(message: string ,data: ProjectData, code: number, url: string) {
    this.message = message;
    this.data = data;
    this.code = code;
    this.url = url;
  }

}


export class ProjectPages{
  constructor(
    public id : string,
    public projectName : string,
    public createTime : string,
    public owerId : string,
    public owername : string,
    public description : string,
  ){}
}

export class ProjectData {
  constructor(
    public pages: ProjectPages[],
    public total: number
  ){}
}


// export class projectDetail {
//   constructor(
//     public message: string,
//     public data: ProjectPages,
//     public code: number,
//     public url: string
//   ){}
// }


export class memberData {
  constructor(
    public userId: string,
    public username: string,
    public email: string
  ){}
}

export class searchResult {
  constructor(
    public inPro: memberData[],
    public out: memberData[],
  ){}
}
