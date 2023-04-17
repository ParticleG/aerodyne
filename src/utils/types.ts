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

  constructor(result: WsResult, action?: WsAction, data?: any) {
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

interface ChatMessage {
  avatar: string;
  bgColor: string;
  name: string;
  sent: boolean;
  stamp: string;
  text: string[];
  textColor: string;
}

interface TouchPanEvent {
  isFirst: boolean;
  isFinal: boolean;
  duration: number;
  distance: {
    x: number;
    y: number;
  };
  offset: {
    x: number;
    y: number;
  };
  delta: {
    x: number;
    y: number;
  };
}

export type { OicqAccount, UserId, UUID, ChatMessage,TouchPanEvent };

export { WsAction, ClientState, WsRequest, WsResponse };
