import { DiscussMessage, GroupMessage, PrivateMessage } from 'icqq';

export type OicqAccount = number;
export type UserId = number;
export type OicqMessage = DiscussMessage | GroupMessage | PrivateMessage;
