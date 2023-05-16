import { defineStore } from 'pinia';
import { computed, reactive, Ref, ref } from 'vue';

import { ws } from 'boot/ws';
import {
  ClientMap,
  ClientMessageContainers,
  ClientMessages,
  processClientInfo,
  processLogin,
  processMessage,
  processSubscribe,
} from 'stores/client.implements';
import { WsHandler } from 'types/WsWrapper';
import { ActionSubscribe, WsAction } from 'types/actions';
import { OicqAccount } from 'types/common';
import {
  ResponseClientInfo,
  ResponseLogin,
  ResponseMessage,
  ResponseSubscribe,
  WsResponse,
} from 'types/responses';

export const useClientStore = defineStore(
  'client',
  () => {
    const currentAccount: Ref<OicqAccount> = ref(0);
    const currentSession = ref('');

    const clientMap: ClientMap = reactive({});
    const clientMessages: ClientMessages = reactive({});
    const recentSenders: ClientMessageContainers = reactive({});
    const externalHandlers = reactive(
      new Map<WsAction, WsHandler<WsResponse>>()
    );
    const currentClient = computed(() => clientMap[currentAccount.value]);
    const currentMessages = computed(
      () => clientMessages[currentAccount.value]?.[currentSession.value] ?? []
    );
    const currentRecentSenders = computed(
      () => recentSenders[currentAccount.value] ?? []
    );

    const registerHandler = (
      action: WsAction,
      handler: WsHandler<WsResponse>
    ) => {
      externalHandlers.set(action, handler);
    };

    ws.setHandler(WsAction.ClientInfo, ((wsResponse) => {
      externalHandlers.get(WsAction.ClientInfo)?.(wsResponse);
      processClientInfo(wsResponse, clientMap);
    }) as WsHandler<ResponseClientInfo>);
    ws.setHandler(WsAction.Login, ((wsResponse) => {
      externalHandlers.get(WsAction.Login)?.(wsResponse);
      processLogin(wsResponse, clientMap);
    }) as WsHandler<ResponseLogin>);
    ws.setHandler(WsAction.Message, ((wsResponse) => {
      externalHandlers.get(WsAction.Message)?.(wsResponse);
      processMessage(wsResponse, clientMessages, recentSenders);
    }) as WsHandler<ResponseMessage>);
    ws.setHandler(WsAction.Subscribe, ((wsResponse) => {
      externalHandlers.get(WsAction.Subscribe)?.(wsResponse);
      processSubscribe(wsResponse, clientMap);
    }) as WsHandler<ResponseSubscribe>);
    ws.addOnOpenHandler(() => {
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
      currentClient,
      currentRecentSenders,
      currentMessages,
      registerHandler,
    };
  },
  {
    persist: {
      paths: ['currentAccount', 'currentSession', 'clientMap', 'recentSenders'],
    },
  }
);
