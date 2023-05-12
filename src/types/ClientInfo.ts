import {
  Anonymous,
  FriendInfo,
  Gender,
  GroupInfo,
  MemberInfo,
  OnlineStatus,
} from 'icqq';

import { OicqAccount } from 'types/common';

export interface FriendData extends FriendInfo {
  lastUpdate: Date;
  avatarUrl: string;
  age: number;
  area: string;
}

export interface GroupData extends GroupInfo {
  lastUpdate: Date;
  anonymous: Omit<Anonymous, 'flag'>;
  memberMap: Map<number, MemberInfo>;
  avatarUrl: string;
  atAllRemainder: number;
}

export interface ClientInfo {
  account: OicqAccount;
  avatarUrl: string;
  status: OnlineStatus;
  nickname: string;
  sex: Gender;
  age: number;
  friendList: FriendData[];
  groupList: GroupData[];
}
