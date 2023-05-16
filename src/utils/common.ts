import { OicqMessageContainer, OicqMessageDisplay } from 'types/OicqMessage';
import { BfaceElem } from 'icqq';

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const trueThen = (condition: unknown, value: string | undefined) =>
  condition ? value : undefined;

export const falseThen = (condition: unknown, value: string | undefined) =>
  condition ? undefined : value;

export const getUuid = (value: OicqMessageDisplay | OicqMessageContainer) =>
  `${value.type}_${value.id}`;

export const getBfaceUrl = (bface: BfaceElem, size = 300) =>
  'https://gxh.vip.qq.com/club/item/parcel/item/' +
  bface.file.substring(0, 2) +
  '/' +
  bface.file.substring(0, 32) +
  `/${size}x${size}.png`;
