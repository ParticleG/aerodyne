type OicqAccount = number;
type UserId = number;
type UUID = string;
type WsResult = 'success' | 'failure' | 'error';

enum WsAction {
  Invalid = 'Invalid',
  Monitor = 'Monitor',
  List = 'List',
  Subscribe = 'Subscribe',
  Login = 'Login',
  Logout = 'Logout',
  Message = 'Message',
}

enum ClientState {
  Null = -1,
  Offline,
  WaitingSmsCode,
  WaitingQRCode,
  WaitingSlider,
  Online,
}

class WsRequest {
  action: WsAction;
  data: unknown;

  constructor(action?: WsAction, data?: unknown) {
    if (action === undefined || !Object.values(WsAction).includes(action)) {
      this.action = WsAction.Invalid;
    } else {
      this.action = action;
    }
    this.data = data;
  }
}

class WsResponse extends WsRequest {
  result: WsResult;

  constructor(result: WsResult, action?: WsAction, data?: unknown) {
    super(action, data);
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

export type { OicqAccount, UserId, UUID };

export { WsAction, ClientState, WsRequest, WsResponse };
