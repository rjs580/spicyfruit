export enum MSGType {Success, Error}

export class Msg {
  code: number;
  message: string;
  status: MSGType;
  constructor(c?: number, m?: string) {
    if(c == 0) this.status = MSGType.Success;
    if(c == -1) this.status = MSGType.Error;
  }

  static deserialize(json: any): Msg {
    let msg = Object.create(Msg.prototype);
    return Object.assign(msg, json, {
      status: (json.code == 0) ? MSGType.Success : MSGType.Error
    });
  }
}
