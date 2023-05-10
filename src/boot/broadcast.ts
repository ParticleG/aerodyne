import { boot } from 'quasar/wrappers';

export const broadcast = new BroadcastChannel('SW_BROADCAST');

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$broadcast = broadcast;
  app.provide('broadcast', broadcast);
});
