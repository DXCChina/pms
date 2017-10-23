export class Device {
  constructor(public id: string,
              public status: string,
              public cpuabi: string,
              public sdk: string,
              public width: string,
              public height: string,
              public osName: string,
              public density: string,
              public model: string,
              public brand: string,
              public version: string,
              public host: string,
              public sessionId: string,
              public agent: string,
              public checked?: boolean) {
    checked = false;
  }
}
