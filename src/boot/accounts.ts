import { Notify } from 'quasar';
import { boot } from 'quasar/wrappers';

import { UserId, WsAction } from 'src/utils/types';
import { ActionBase } from 'src/utils/actions';

type WsHandler = (message: string) => void;

class WsWrapper {
  private ws: WebSocket;

  constructor(url: string) {
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

  handlers: Map<WsAction, WsHandler> = new Map();

  setOnOpen(handler: (this: WebSocket, ev: Event) => void) {
    this.ws.onopen = handler;
  }

  setOnError(handler: (this: WebSocket, ev: Event) => void) {
    this.ws.onerror = handler;
  }

  setOnClose(handler: (this: WebSocket, ev: CloseEvent) => void) {
    this.ws.onclose = handler;
  }

  setHandler(action: WsAction, handler: WsHandler) {
    this.handlers.set(action, handler);
  }

  deleteHandler(action: WsAction) {
    this.handlers.delete(action);
  }

  send(message: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.log('WebSocket not connected');
    }
  }

  sendAction(object: ActionBase) {
    this.send(JSON.stringify(object));
  }
}

const wsMap = new Map<UserId, WsWrapper>();

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$wsMap = wsMap;
  app.provide('wsMap', wsMap);
});

export { WsWrapper, wsMap };
