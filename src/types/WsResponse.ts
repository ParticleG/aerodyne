import { WsAction } from 'types/WsAction';

type WsResult = 'success' | 'failure' | 'error';

export class WsResponse {
  action: WsAction;
  data: unknown;
  result: WsResult;

  constructor(result: WsResult, action?: WsAction, data?: unknown) {
    if (action === undefined || !Object.values(WsAction).includes(action)) {
      this.action = WsAction.Invalid;
    } else {
      this.action = action;
    }
    this.data = data;
    this.result = result;
  }

  toString() {
    return JSON.stringify({
      result: this.result,
      action: this.action,
      data: this.data,
    });
  }
}
