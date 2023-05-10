import { WsAction } from 'utils/types';

interface ActionBase {
  action: WsAction;
  data?: unknown;
}

interface ActionMonitor extends ActionBase {
  action: WsAction.Monitor;
  data: null;
}

interface ActionList extends ActionBase {
  action: WsAction.List;
  data: null;
}

interface ActionSubscribe extends ActionBase {
  action: WsAction.Subscribe;
  data: {
    account: number;
  };
}

interface ActionLogin extends ActionBase {
  action: WsAction.Login;
  data: {
    account: number;
    payload?: string;
  };
}

interface ActionLogout extends ActionBase {
  action: WsAction.Logout;
  data: {
    account: number;
  };
}

interface ActionMessage extends ActionBase {
  action: WsAction.Message;
  data: {
    sender: number;
    message: string;
  };
}

export type {
  ActionBase,
  ActionMonitor,
  ActionList,
  ActionSubscribe,
  ActionLogin,
  ActionLogout,
  ActionMessage,
};
