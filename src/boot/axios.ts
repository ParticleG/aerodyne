import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

class AxiosWrapper {
  api?: AxiosInstance;

  create(baseURL: string) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

const $axios = new AxiosWrapper();

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$axios = $axios;
  app.provide('axios', $axios);
});

export { $axios };
