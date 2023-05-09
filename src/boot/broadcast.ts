import { boot } from 'quasar/wrappers';

const broadcast = new BroadcastChannel('SW_BROADCAST');

enum MessageType {
  SUBSCRIBE,
}

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$broadcast = broadcast;
  app.provide('broadcast', broadcast);
});

export { broadcast, MessageType };
