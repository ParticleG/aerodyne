import { DiscussMessage, GroupMessage, PrivateMessage } from 'icqq';
import { MessageElem } from 'icqq/lib/message/elements';
import { Anonymous } from 'icqq/lib/message/message';
import { GroupRole } from 'icqq/lib/common';
import { WsResponse } from 'types/responses';

export interface OicqDiscussMessage {
  type: 'discuss';
  ping: false | 'me';
  sender: {
    userId: number;
    nickname: string;
    card: string;
  };
}

export interface OicqGroupMessage {
  type: 'group';
  subType: 'normal' | 'anonymous';
  anonymous: Anonymous | null;
  block: boolean;
  ping: false | 'me' | 'all';
  sender: {
    userId: number;
    nickname: string;
    card: string;
    level: number;
    role: GroupRole;
    title: string;
  };
}

export interface OicqPrivateMessage {
  type: 'private';
  subType: 'group' | 'friend' | 'other' | 'self';
  fromId: number;
  toId: number;
  sender: {
    userId: number;
    nickname: string;
    groupId?: number;
    discussId?: number;
  };
}

export class OicqMessage {
  // Public properties
  type: 'discuss' | 'group' | 'private';
  timestamp: number;
  components: MessageElem[];
  messageRaw: string;
  font: string;
  messageId: string;
  seq: number;
  rand: number;
  packetNo: number;
  index: number;
  div: number;
  // Type specific properties
  id: number;
  name: string;
  sender: {
    userId: number;
    nickname: string;
    card?: string;
    level?: number;
    role?: GroupRole;
    title?: string;
    groupId?: number;
    discussId?: number;
  };
  subType?: ('normal' | 'anonymous') | ('group' | 'friend' | 'other' | 'self');
  ping?: false | 'me' | 'all';
  anonymous?: Anonymous | null;
  block?: boolean;
  fromId?: number;
  toId?: number;

  constructor(message: DiscussMessage | GroupMessage | PrivateMessage) {
    this.type = message.message_type;
    this.timestamp = message.time * 1000;
    this.components = message.message;
    this.messageRaw = message.raw_message;
    this.font = message.font;
    this.messageId = message.message_id;
    this.seq = message.seq;
    this.rand = message.rand;
    this.packetNo = message.pktnum;
    this.index = message.index;
    this.div = message.div;
    this.sender = {
      userId: message.sender.user_id,
      nickname: message.sender.nickname,
    };
    switch (message.message_type) {
      case 'discuss':
        this.id = message.discuss_id;
        this.name = message.discuss_name;
        this.sender.card = message.sender.card;
        this.ping = message.atme ? 'me' : false;
        break;
      case 'group':
        this.id = message.group_id;
        this.name = message.group_name;
        this.sender.card = message.sender.card;
        this.sender.level = message.sender.level;
        this.sender.role = message.sender.role;
        this.sender.title = message.sender.title;
        this.subType = message.sub_type;
        this.ping = message.atall ? 'all' : message.atme ? 'me' : false;
        this.anonymous = message.anonymous;
        this.block = message.block;
        break;
      case 'private':
        this.id = message.sender.user_id;
        this.name = message.sender.nickname;
        this.sender.groupId = message.sender.group_id;
        this.sender.discussId = message.sender.discuss_id;
        this.subType = message.sub_type;
        this.fromId = message.from_id;
        this.toId = message.to_id;
        break;
    }
  }
}

export const newOicqMessage = (wsResponse: WsResponse) => {
  const message = <OicqMessage>wsResponse.data;
  switch (message.type) {
    case 'discuss':
      return <OicqDiscussMessage>message;
    case 'group':
      return <OicqGroupMessage>message;
    case 'private':
      return <OicqPrivateMessage>message;
  }
};
