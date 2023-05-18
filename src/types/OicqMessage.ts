import { MessageElem, Quotable } from 'icqq/lib/message/elements';
import { Anonymous } from 'icqq/lib/message/message';
import { GroupRole } from 'icqq/lib/common';
import { OicqAccount } from 'types/common';

interface OicqSharedMessage {
  type: 'discuss' | 'group' | 'private';
  id: number;
  name: string;
  timestamp: number;
  avatarUrl: string;
  components: MessageElem[];
  messageRaw: string;
  font: string;
  messageId: string;
  seq: number;
  rand: number;
  source?: Quotable;
  packetNo: number;
  index: number;
  div: number;
}

interface OicqDiscussMessage extends OicqSharedMessage {
  type: 'discuss';
  ping: false | 'me';
  sender: {
    userId: number;
    nickname: string;
    card: string;
  };
}

interface OicqGroupMessage extends OicqSharedMessage {
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

interface OicqPrivateMessage extends OicqSharedMessage {
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

interface OicqMessage extends OicqSharedMessage {
  sender: {
    userId: number;
    nickname: string;
    avatarUrl: string;
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
}

export class OicqMessageDisplay implements OicqMessage {
  // Shared
  type: 'discuss' | 'group' | 'private';
  id: number;
  name: string;
  timestamp: number;
  avatarUrl: string;
  components: MessageElem[];
  messageRaw: string;
  font: string;
  messageId: string;
  seq: number;
  rand: number;
  source?: Quotable;
  packetNo: number;
  index: number;
  div: number;
  // Type specific
  sender: {
    userId: number;
    nickname: string;
    avatarUrl: string;
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
  // Display
  messages: MessageElem[][];
  sent: boolean;

  constructor(oicqMessage: OicqMessage, currentAccount: OicqAccount) {
    this.type = oicqMessage.type;
    this.id = oicqMessage.id;
    this.name = oicqMessage.name;
    this.timestamp = oicqMessage.timestamp;
    this.avatarUrl = oicqMessage.avatarUrl;
    this.components = oicqMessage.components;
    this.messageRaw = oicqMessage.messageRaw;
    this.font = oicqMessage.font;
    this.messageId = oicqMessage.messageId;
    this.seq = oicqMessage.seq;
    this.rand = oicqMessage.rand;
    this.source = oicqMessage.source;
    this.packetNo = oicqMessage.packetNo;
    this.index = oicqMessage.index;
    this.div = oicqMessage.div;

    this.sender = oicqMessage.sender;
    this.subType = oicqMessage.subType;
    this.ping = oicqMessage.ping;
    this.anonymous = oicqMessage.anonymous;
    this.block = oicqMessage.block;
    this.fromId = oicqMessage.fromId;
    this.toId = oicqMessage.toId;

    this.messages = [this.components];
    this.sent = this.sender.userId === currentAccount;
  }

  addMessage(message: MessageElem[]) {
    // TODO: Check if message is ChainElem
    this.messages.push(message);
    return true;
  }
}

export interface OicqMessageContainer {
  type: 'discuss' | 'group' | 'private';
  id: number;
  name: string;
  avatarUrl: string;
  message: {
    name: string;
    text: string;
    time: number;
  };
  unread: number;
}

export const identifyOicqMessage = (message: OicqMessage) => {
  switch (message.type) {
    case 'discuss':
      return <OicqDiscussMessage>message;
    case 'group':
      return <OicqGroupMessage>message;
    case 'private':
      return <OicqPrivateMessage>message;
  }
};
