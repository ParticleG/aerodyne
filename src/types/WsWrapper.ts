import { WsAction } from 'types/WsAction';
import { Notify } from 'quasar';
import { ActionBase } from 'types/actions';
import { WsHandler } from 'types/common';

export class WsWrapper {
  handlers: Map<WsAction, WsHandler> = new Map();
  private ws: WebSocket | undefined;

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (this.handlers.has(message.action)) {
        this.handlers.get(message.action)?.call(this, message);
      } else {
        Notify.create({
          type: 'warning',
          message: `Unknown action(${message.action}): ${message}`,
          icon: 'help_outline',
        });
      }
    };
  }

  isOpen() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  setHandler(action: WsAction, handler: WsHandler) {
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
