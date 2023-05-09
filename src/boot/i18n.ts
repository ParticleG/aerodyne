import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

// noinspection JSUnusedGlobalSymbols
export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en-US'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  // noinspection JSUnusedGlobalSymbols
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  // noinspection JSUnusedGlobalSymbols
  export interface DefineDateTimeFormat {}

  // define the number format schema
  // noinspection JSUnusedGlobalSymbols
  export interface DefineNumberFormat {}
}

const i18n = createI18n({
  fallbackLocale: 'en-US',
  legacy: false,
  messages,
});

export default boot(({ app }) => {
  app.use(i18n);
});

export const i18nGlobal = i18n.global;
