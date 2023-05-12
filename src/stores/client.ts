import { defineStore } from 'pinia';
import { reactive } from 'vue';

import { ws } from 'boot/ws';
import { OicqAccount } from 'types/common';
import { ClientInfo } from 'types/ClientInfo';
import { WsAction } from 'types/WsAction';
import { getAvatarUrl } from 'utils/tools';

export const useClientStore = defineStore('client', () => {
  const clients: Record<OicqAccount, ClientInfo> = reactive({});

  const registerHandler = () => {
    ws.setHandler(WsAction.ClientInfo, (wsResponse) => {
      if (wsResponse.result === 'success') {
        const clientInfo = <ClientInfo>wsResponse.data;
        clientInfo.avatarUrl = getAvatarUrl(clientInfo.account);
        console.log(clientInfo);
        clients[clientInfo.account] = clientInfo;
      }
    });
  };
  return { clients, registerHandler };
});
