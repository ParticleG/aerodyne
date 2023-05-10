import { boot } from 'quasar/wrappers';

import { AxiosWrapper } from 'types/AxiosWrapper';

export const $axios = new AxiosWrapper();

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$axios = $axios;
  app.provide('axios', $axios);
});
