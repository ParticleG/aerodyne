import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { ws } from 'boot/ws';
import { WsAction } from 'types/WsAction';
import {
  DiscussMessageEvent,
  GroupMessageEvent,
  PrivateMessageEvent,
} from 'icqq';

export const useMessagesStore = defineStore(
  'messages',
  () => {
    const messages: Record<
      number,
      (PrivateMessageEvent | GroupMessageEvent | DiscussMessageEvent)[]
    > = reactive({});

    const registerHandler = () => {
      ws.setHandler(WsAction.Message, (wsResponse) => {
        if (wsResponse.result === 'success') {
          const message = wsResponse.data as
            | PrivateMessageEvent
            | GroupMessageEvent
            | DiscussMessageEvent;
          let id: number;
          switch (message.message_type) {
            case 'private':
              id = message.sender.user_id;
              break;
            case 'discuss':
              id = message.discuss_id;
              break;
            case 'group':
              id = message.group_id;
              break;
          }
          messages[id] ??= [];
          messages[id].push(message);
        }
      });
    };
    return {
      messages,
      registerHandler,
    };
  },
  {
    persist: false,
  }
);
