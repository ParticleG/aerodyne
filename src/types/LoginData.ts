import { ClientState } from 'types/ClientState';

interface LoginDataOnline {
  state: ClientState.Online;
}

interface LoginDataWaitingSmsCode {
  state: ClientState.WaitingSmsCode;
  url: string;
  phone: string;
}

interface LoginDataWaitingQRCode {
  state: ClientState.WaitingQRCode;
  image: Buffer;
}

interface LoginDataWaitingSlider {
  state: ClientState.WaitingSlider;
  url: string;
}

export type LoginData =
  | LoginDataOnline
  | LoginDataWaitingSmsCode
  | LoginDataWaitingQRCode
  | LoginDataWaitingSlider;
