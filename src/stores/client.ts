import { defineStore } from 'pinia';
import { reactive } from 'vue';

import { ws } from 'boot/ws';
import { OicqAccount } from 'types/common';
import { ClientInfo } from 'types/ClientInfo';
import { getAvatarUrl, sleep } from 'utils/tools';
import { ActionClientInfo, ActionSubscribe, WsAction } from 'types/actions';
import { ClientState } from 'types/ClientState';
import { WsHandler } from 'types/WsWrapper';
import { ResponseSubscribe } from 'types/responses';

export const useClientStore = defineStore('client', () => {
  const clients: Record<OicqAccount, ClientInfo> = reactive({});

  const initialize = async () => {
    ws.setHandler(WsAction.ClientInfo, (wsResponse) => {
      if (wsResponse.result === 'success') {
        const clientInfo = <ClientInfo>wsResponse.data;
        clientInfo.avatarUrl = getAvatarUrl(clientInfo.account);
        console.log(clientInfo);
        clients[clientInfo.account] = clientInfo;
      }
    });
    ws?.setHandler(WsAction.Subscribe, <WsHandler<ResponseSubscribe>>((
      data
    ) => {
      const account = data.account;
      if (!account) {
        return;
      }
      switch (data.result) {
        case 'success': {
          const state = data.data;
          if ((state as ClientState) === ClientState.Online) {
            ws?.send(new ActionClientInfo(Number(account)));
          } else {
            delete clients[account];
          }
          break;
        }
        case 'failure':
        case 'error':
          console.log(data);
          break;
      }
    }));
    while (!ws.isOpen()) {
      await sleep(100);
    }
    for (const account in clients) {
      ws.send(new ActionSubscribe(Number(account)));
    }
  };
  return { clients, initialize };
});
