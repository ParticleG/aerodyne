import { ClientInfo } from 'types/ClientInfo';
import { OicqMessageContainer, OicqMessageDisplay } from 'types/OicqMessage';
import { OicqAccount } from 'types/common';
import {
  ResponseClientInfo,
  ResponseLogin,
  ResponseMessage,
  ResponseSubscribe,
  WsErrorResponse,
  WsFailureResponse,
  WsResponse,
} from 'types/responses';
import { ClientState } from 'types/ClientState';
import { ws } from 'boot/ws';
import { ActionClientInfo } from 'types/actions';
import { getUuid } from 'utils/common';

type WsGenericResponse<T extends WsResponse> =
  | WsFailureResponse
  | WsErrorResponse
  | T;

export type ClientMap = Record<OicqAccount, ClientInfo>;
export type ClientMessages = Record<
  OicqAccount,
  Record<string, OicqMessageDisplay[]>
>;
export type ClientMessageContainers = Record<
  OicqAccount,
  OicqMessageContainer[]
>;

export const processClientInfo = (
  wsResponse: WsGenericResponse<ResponseClientInfo>,
  clientMap: ClientMap
) => {
  if (wsResponse.result === 'success') {
    const clientInfo = wsResponse.data;
    console.log(clientInfo);
    clientMap[clientInfo.account] = clientInfo;
  }
};

export const processLogin = (
  wsResponse: WsGenericResponse<ResponseLogin>,
  clientMap: ClientMap
) => {
  const account = wsResponse.account;
  if (!account) {
    return;
  }
  if (wsResponse.result === 'success') {
    if (wsResponse.data.state === ClientState.Online) {
      ws.send(new ActionClientInfo(account));
    } else {
      delete clientMap[account];
    }
  } else {
    delete clientMap[account];
  }
};

export const processSubscribe = (
  wsResponse: WsGenericResponse<ResponseSubscribe>,
  clientMap: ClientMap
) => {
  const account = wsResponse.account;
  if (!account) {
    return;
  }
  if (wsResponse.result === 'success') {
    if (wsResponse.data === ClientState.Online) {
      ws.send(new ActionClientInfo(account));
    } else {
      delete clientMap[account];
    }
  } else {
    delete clientMap[account];
  }
};

export const processMessage = (
  wsResponse: WsGenericResponse<ResponseMessage>,
  clientMessages: ClientMessages,
  recentSenders: ClientMessageContainers
) => {
  if (wsResponse.result === 'success') {
    updateClientMessages(wsResponse, clientMessages);
    updateRecentSenders(wsResponse, recentSenders);
  }
};

const updateClientMessages = (
  wsResponse: ResponseMessage,
  clientMessages: ClientMessages
) => {
  const oicqMessage = wsResponse.data;
  const uuid = getUuid(oicqMessage);

  clientMessages[wsResponse.account] ??= {};
  clientMessages[wsResponse.account][uuid] ??= [];
  clientMessages[wsResponse.account][uuid].push(
    new OicqMessageDisplay(oicqMessage, wsResponse.account)
  );
};

const updateRecentSenders = (
  wsResponse: ResponseMessage,
  recentSenders: ClientMessageContainers
) => {
  const oicqMessage = wsResponse.data;
  let lastUnread = 0;
  recentSenders[wsResponse.account] ??= [];
  recentSenders[wsResponse.account] = recentSenders[wsResponse.account].filter(
    (sender) => {
      const isSameSender =
        sender.type === oicqMessage.type && sender.id === oicqMessage.id;
      if (isSameSender) {
        lastUnread = sender.unread;
      }
      return !isSameSender;
    }
  );
  recentSenders[wsResponse.account].unshift({
    id: oicqMessage.id,
    type: oicqMessage.type,
    name: oicqMessage.name,
    avatarUrl: oicqMessage.avatarUrl,
    message: {
      name: oicqMessage.sender.nickname,
      text: oicqMessage.messageRaw,
      time: oicqMessage.timestamp,
    },
    unread: lastUnread + 1,
  });
};
