import { Notify } from 'quasar';
import { ActionBase, WsAction } from 'types/actions';
import {
  WsErrorResponse,
  WsFailureResponse,
  WsResponse,
} from 'types/responses';

export type WsHandler<T extends WsResponse> = (
  message: T | WsFailureResponse | WsErrorResponse
) => void;

export class WsWrapper {
  handlers: Map<WsAction, WsHandler<never>> = new Map();
  private url = '';
  private ws: WebSocket | undefined;

  connect(url: string) {
    this.url = url;
    this.ws = new WebSocket(url);
    this.ws.onclose = () => {
      Notify.create({
        type: 'negative',
        message: 'WebSocket closed, reconnecting...',
        icon: 'close',
      });
      setTimeout(() => {
        this.connect(this.url);
      }, 3000);
    };
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (this.handlers.has(message.action)) {
        this.handlers.get(message.action)?.call(this, message);
      } else {
        Notify.create({
          type: 'warning',
          message: `Unknown action: ${message.action}`,
          caption: JSON.stringify(message.data),
          icon: 'help_outline',
        });
        console.log(message);
      }
    };
    this.ws.onopen = () => {
      Notify.create({
        type: 'positive',
        message: 'WebSocket connected',
        icon: 'check',
      });
    };
  }

  isOpen() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  setHandler<T extends WsResponse>(action: WsAction, handler: WsHandler<T>) {
    this.handlers.set(action, handler);
  }

  deleteHandler(action: WsAction) {
    this.handlers.delete(action);
  }

  send(object: ActionBase) {
    this.sendRaw(JSON.stringify(object));
  }

  private sendRaw(message: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.isOpen()) {
      this.ws?.send(message);
    } else {
      console.log('WebSocket not connected');
    }
  }
}
