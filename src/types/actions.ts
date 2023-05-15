import { OicqAccount } from 'types/common';

export enum WsAction {
  Monitor = 'Monitor',
  List = 'List',
  Subscribe = 'Subscribe',
  Login = 'Login',
  Logout = 'Logout',
  Message = 'Message',
  ClientInfo = 'ClientInfo',
}

export interface ActionBase {
  action: WsAction;
  account?: OicqAccount;
  data?: unknown;
}

export class ActionMonitor implements ActionBase {
  action = WsAction.Monitor;
}

export class ActionList implements ActionBase {
  action = WsAction.List;
}

export class ActionSubscribe implements ActionBase {
  action = WsAction.Subscribe;
  account: OicqAccount;

  constructor(account: number) {
    this.account = account;
  }
}

export class ActionLogin implements ActionBase {
  action = WsAction.Login;
  account: OicqAccount;
  data?: string;

  constructor(account: number, payload?: string) {
    this.account = account;
    this.data = payload;
  }
}

export class ActionLogout implements ActionBase {
  action = WsAction.Logout;
  account: OicqAccount;

  constructor(account: number) {
    this.account = account;
  }
}

export class ActionMessage implements ActionBase {
  action = WsAction.Message;
  account: OicqAccount;
  data: {
    message: string;
  };

  constructor(account: number, message: string) {
    this.account = account;
    this.data = { message };
  }
}

export class ActionClientInfo implements ActionBase {
  action = WsAction.ClientInfo;
  account: OicqAccount;

  constructor(account: number) {
    this.account = account;
  }
}
