import { WsAction } from 'types/WsAction';

export interface ActionBase {
  action: WsAction;
  data?: unknown;
}

export interface ActionMonitor extends ActionBase {
  action: WsAction.Monitor;
  data: null;
}

export interface ActionList extends ActionBase {
  action: WsAction.List;
  data: null;
}

export interface ActionSubscribe extends ActionBase {
  action: WsAction.Subscribe;
  data: {
    account: number;
  };
}

export interface ActionLogin extends ActionBase {
  action: WsAction.Login;
  data: {
    account: number;
    payload?: string;
  };
}

export interface ActionLogout extends ActionBase {
  action: WsAction.Logout;
  data: {
    account: number;
  };
}

export interface ActionMessage extends ActionBase {
  action: WsAction.Message;
  data: {
    sender: number;
    message: string;
  };
}
