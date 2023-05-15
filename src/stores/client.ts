import { DiscussMessage, GroupMessage, PrivateMessage } from 'icqq';
import { defineStore } from 'pinia';
import { computed, reactive, Ref, ref } from 'vue';

import { ws } from 'boot/ws';
import { ClientInfo } from 'types/ClientInfo';
import { ClientState } from 'types/ClientState';
import { WsHandler } from 'types/WsWrapper';
import { ActionClientInfo, ActionSubscribe, WsAction } from 'types/actions';
import { OicqAccount, OicqMessage } from 'types/common';
import {
  ResponseClientInfo,
  ResponseLogin,
  ResponseMessage,
  ResponseSubscribe,
  WsResponse,
} from 'types/responses';

type MessageType = 'discuss' | 'group' | 'private';

export interface MessageContainer {
  id: number;
  type: MessageType;
  name: string;
  avatarUrl: string;
  message: {
    name: string;
    text: string;
    time: number;
  };
  unread: number;
}

export const useClientStore = defineStore(
  'client',
  () => {
    const currentAccount: Ref<OicqAccount> = ref(0);
    const currentSession: Ref<MessageContainer | undefined> = ref();

    const clientMap: Record<OicqAccount, ClientInfo> = reactive({});
    const clientMessages: Record<
      OicqAccount,
      Record<MessageType, Record<number, OicqMessage[]>>
    > = reactive({});
    const recentSenders: Record<OicqAccount, MessageContainer[]> = reactive({});
    const externalHandlers = reactive(
      new Map<WsAction, WsHandler<WsResponse>>()
    );
    const currentClient = computed(() => clientMap[currentAccount.value]);
    const currentRecentSenders = computed(
      () => recentSenders[currentAccount.value] ?? []
    );
    const currentMessages = computed(() => {
      let messages: OicqMessage[] | undefined;
      if (currentSession.value) {
        const allMessages = clientMessages[currentAccount.value];
        switch (currentSession.value.type) {
          case 'discuss':
            messages = allMessages?.discuss?.[currentSession.value.id];
            break;
          case 'group':
            messages = allMessages?.group?.[currentSession.value.id];
            break;
          case 'private':
            messages = allMessages?.private?.[currentSession.value.id];
            break;
        }
      }
      return messages ?? [];
    });

    ws.setHandler(WsAction.ClientInfo, ((wsResponse) => {
      externalHandlers.get(WsAction.ClientInfo)?.(wsResponse);
      if (wsResponse.result === 'success') {
        const clientInfo = wsResponse.data;
        console.log(clientInfo);
        clientMap[clientInfo.account] = clientInfo;
      }
    }) as WsHandler<ResponseClientInfo>);
    ws.setHandler(WsAction.Login, <WsHandler<ResponseLogin>>((wsResponse) => {
      externalHandlers.get(WsAction.Login)?.(wsResponse);
      const account = wsResponse.account;
      if (!account) {
        return;
      }
      switch (wsResponse.result) {
        case 'success': {
          if (wsResponse.data.state === ClientState.Online) {
            ws.send(new ActionClientInfo(account));
          } else {
            delete clientMap[account];
          }
          break;
        }
        case 'failure':
        case 'error':
          delete clientMap[account];
          break;
      }
    }));
    ws.setHandler(WsAction.Message, ((wsResponse) => {
      externalHandlers.get(WsAction.Message)?.(wsResponse);
      if (wsResponse.result === 'success') {
        const message = wsResponse.data;
        message.time *= 1000;
        const id =
          message.message_type === 'discuss'
            ? message.discuss_id
            : message.message_type === 'group'
            ? message.group_id
            : message.sender.user_id;

        clientMessages[wsResponse.account] ??= {
          discuss: <Record<number, DiscussMessage[]>>{},
          group: <Record<number, GroupMessage[]>>{},
          private: <Record<number, PrivateMessage[]>>{},
        };
        clientMessages[wsResponse.account][message.message_type][id] ??= [];
        clientMessages[wsResponse.account][message.message_type][id].push(
          message
        );

        let lastUnread = 0;
        recentSenders[wsResponse.account] ??= [];
        recentSenders[wsResponse.account] = recentSenders[
          wsResponse.account
        ].filter((sender) => {
          const isSameSender =
            sender.id === id && sender.type === message.message_type;
          if (isSameSender) {
            lastUnread = sender.unread;
          }
          return !isSameSender;
        });
        console.log(message, lastUnread);
        recentSenders[wsResponse.account].unshift({
          id: id,
          type: message.message_type,
          name:
            message.message_type === 'discuss'
              ? message.discuss_name
              : message.message_type === 'group'
              ? message.group_name
              : message.sender.nickname,
          avatarUrl:
            message.message_type === 'private'
              ? clientMap[wsResponse.account].friends[id].avatarUrl
              : clientMap[wsResponse.account].groups[id].avatarUrl,
          message: {
            name: message.sender.nickname,
            text: message.raw_message,
            time: message.time,
          },
          unread: lastUnread + 1,
        });
        console.log(message, lastUnread);
      }
    }) as WsHandler<ResponseMessage>);
    ws.setHandler(WsAction.Subscribe, <WsHandler<ResponseSubscribe>>((
      wsResponse
    ) => {
      externalHandlers.get(WsAction.Subscribe)?.(wsResponse);
      const account = wsResponse.account;
      if (!account) {
        return;
      }
      switch (wsResponse.result) {
        case 'success': {
          if (wsResponse.data === ClientState.Online) {
            ws.send(new ActionClientInfo(account));
          } else {
            delete clientMap[account];
          }
          break;
        }
        case 'failure':
        case 'error':
          delete clientMap[account];
          break;
      }
    }));
    ws.addOnOpenHandler(async () => {
      for (const account in clientMap) {
        ws.send(new ActionSubscribe(Number(account)));
      }
    });

    return {
      currentAccount,
      currentSession,
      clientMap,
      clientMessages,
      recentSenders,
      externalHandlers,
      currentClient,
      currentRecentSenders,
      currentMessages,
    };
  },
  {
    persist: {
      paths: ['currentAccount', 'currentSession', 'clientMap', 'recentSenders'],
    },
  }
);
