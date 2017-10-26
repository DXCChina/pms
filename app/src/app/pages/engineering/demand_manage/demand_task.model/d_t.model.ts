export class D_tModel {
  constructor(
    public title: string,
    public detail: string,
    public level: string,
    public status: string,
    public startDate: any,
    public endDate: any,
    public ownerId: number,
    public projectId: number,
    public id: number,
    public progress: number,
    public cost: number,
    public demandId?: number,
    public target?: string
  ){}
}
