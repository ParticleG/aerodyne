import { WsAction } from 'types/actions';
import { OicqAccount, OicqMessage } from 'types/common';
import { ClientState } from 'types/ClientState';
import { ClientInfo } from 'types/ClientInfo';

type WsResult = 'success' | 'failure' | 'error';

export interface WsResponse {
  result: WsResult;
  action: WsAction;
  account?: OicqAccount;
  data: unknown;
}

export interface WsSuccessResponse extends WsResponse {
  result: 'success';
}

export interface WsFailureResponse extends WsResponse {
  result: 'failure';
  data: {
    message: string;
    reasons: string[];
  };
}

export interface WsErrorResponse extends WsResponse {
  result: 'error';
  data: {
    message: string;
    reasons: string[];
  };
}

export interface ResponseMonitor extends WsSuccessResponse {
  action: WsAction.Monitor;
  account: undefined;
  data: {
    cpu: {
      cores: number;
      model: string;
      usage: number;
    };
    memory: {
      totalMemMb: number;
      freeMemMb: number;
      usedMemMb: number;
      freeMemPercentage: number;
      usedMemPercentage: number;
    };
    os: {
      arch: string;
      hostname: string;
      name: string;
      platform:
        | 'aix'
        | 'android'
        | 'darwin'
        | 'freebsd'
        | 'linux'
        | 'openbsd'
        | 'sunos'
        | 'win32'
        | 'cygwin';
    };
  };
}

export interface ResponseList extends WsSuccessResponse {
  action: WsAction.List;
  account: undefined;
  data: OicqAccount[];
}

export interface ResponseSubscribe extends WsSuccessResponse {
  action: WsAction.Subscribe;
  account: OicqAccount;
  data: ClientState;
}

export interface ResponseLogin extends WsSuccessResponse {
  action: WsAction.Login;
  account: OicqAccount;
  data:
    | {
        state: ClientState.WaitingSmsCode;
        url: string;
        phone: string;
      }
    | {
        state: ClientState.WaitingQRCode;
        image: Buffer;
      }
    | {
        state: ClientState.WaitingSlider;
        url: string;
      }
    | {
        state: ClientState.Online;
      };
}

export interface ResponseLogout extends WsSuccessResponse {
  action: WsAction.Logout;
  account: OicqAccount;
}

export interface ResponseMessage extends WsSuccessResponse {
  action: WsAction.Message;
  account: OicqAccount;
  data: OicqMessage;
}

export interface ResponseClientInfo extends WsSuccessResponse {
  action: WsAction.ClientInfo;
  account: OicqAccount;
  data: ClientInfo;
}
