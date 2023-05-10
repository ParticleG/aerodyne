import { WsResponse } from 'types/WsResponse';

export type OicqAccount = number;
export type UserId = number;
export type UUID = string;
export type WsHandler = (message: WsResponse) => void;
