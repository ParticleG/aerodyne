import { boot } from 'quasar/wrappers';
import { WsWrapper } from 'types/WsWrapper';

export const ws = new WsWrapper();

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$ws = ws;
  app.provide('ws', ws);
});
