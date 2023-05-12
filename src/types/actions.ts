import { WsAction } from 'types/WsAction';

export interface ActionBase {
  action: WsAction;
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
  data: {
    account: number;
  };

  constructor(account: number) {
    this.data = { account };
  }
}

export class ActionLogin implements ActionBase {
  action = WsAction.Login;
  data: {
    account: number;
    payload?: string;
  };

  constructor(account: number, payload?: string) {
    this.data = { account, payload };
  }
}

export class ActionLogout implements ActionBase {
  action = WsAction.Logout;
  data: {
    account: number;
  };

  constructor(account: number) {
    this.data = { account };
  }
}

export class ActionMessage implements ActionBase {
  action = WsAction.Message;
  data: {
    sender: number;
    message: string;
  };

  constructor(sender: number, message: string) {
    this.data = { sender, message };
  }
}

export class ActionClientInfo implements ActionBase {
  action = WsAction.ClientInfo;
  data: {
    account: number;
  };

  constructor(account: number) {
    this.data = { account };
  }
}
