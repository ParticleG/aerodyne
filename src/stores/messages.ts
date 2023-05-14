import { DiscussMessage, GroupMessage, PrivateMessage } from 'icqq';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import { ws } from 'boot/ws';
import { useClientStore } from 'stores/client';
import { WsAction } from 'types/actions';
import { OicqAccount } from 'types/common';

export type OicqMessage = DiscussMessage | GroupMessage | PrivateMessage;
export type MessageType = 'discuss' | 'group' | 'private';

export interface MessageWrapper {
  account: OicqAccount;
  message: OicqMessage;
}

export interface MessageContainer {
  id: number;
  type: MessageType;
  name: string;
  avatar: string;
  message: {
    name: string;
    text: string;
    time: number;
  };
  unread: number;
}

export const useMessagesStore = defineStore(
  'messages',
  () => {
    const messages: Record<
      OicqAccount,
      Record<MessageType, Record<number, OicqMessage[]>>
    > = reactive({});

    const recentSenders: Record<OicqAccount, MessageContainer[]> = reactive({});

    const initialize = () => {
      ws.setHandler(WsAction.Message, (wsResponse) => {
        if (wsResponse.result === 'success') {
          const { clients } = useClientStore();
          const messageBuffer = <MessageWrapper>wsResponse.data;
          const message = messageBuffer.message;
          const id =
            message.message_type === 'discuss'
              ? message.discuss_id
              : message.message_type === 'group'
              ? message.group_id
              : message.sender.user_id;

          messages[messageBuffer.account] ??= {
            discuss: <Record<number, DiscussMessage[]>>{},
            group: <Record<number, GroupMessage[]>>{},
            private: <Record<number, PrivateMessage[]>>{},
          };
          messages[messageBuffer.account][message.message_type][id] ??= [];
          messages[messageBuffer.account][message.message_type][id].push(
            message
          );

          let lastUnread = 0;
          console.log(recentSenders[messageBuffer.account]);
          recentSenders[messageBuffer.account] ??= [];
          recentSenders[messageBuffer.account] = recentSenders[
            messageBuffer.account
          ].filter((sender) => {
            if (sender.id === id && sender.type === message.message_type) {
              lastUnread = sender.unread;
            }
            return sender.id !== id && sender.type !== message.message_type;
          });
          console.log(recentSenders[messageBuffer.account]);
          recentSenders[messageBuffer.account].unshift({
            id: id,
            type: message.message_type,
            name:
              message.message_type === 'discuss'
                ? message.discuss_name
                : message.message_type === 'group'
                ? message.group_name
                : message.sender.nickname,
            avatar:
              message.message_type === 'private'
                ? clients[messageBuffer.account]?.friendList[id]?.avatarUrl
                : clients[messageBuffer.account]?.groupList[id]?.avatarUrl,
            message: {
              name: message.sender.nickname,
              text: message.raw_message,
              time: message.time,
            },
            unread: lastUnread + 1,
          });
          console.log(recentSenders[messageBuffer.account]);
        }
      });
    };
    return {
      messages,
      recentSenders,
      initialize,
    };
  },
  {
    persist: false,
  }
);
