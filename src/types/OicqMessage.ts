import { MessageElem } from 'icqq/lib/message/elements';
import { Anonymous } from 'icqq/lib/message/message';
import { GroupRole } from 'icqq/lib/common';

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
  packetNo: number;
  index: number;
  div: number;
}

export interface OicqDiscussMessage extends OicqSharedMessage {
  type: 'discuss';
  ping: false | 'me';
  sender: {
    userId: number;
    nickname: string;
    card: string;
  };
}

export interface OicqGroupMessage extends OicqSharedMessage {
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

export interface OicqPrivateMessage extends OicqSharedMessage {
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

export interface OicqMessage extends OicqSharedMessage {
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
