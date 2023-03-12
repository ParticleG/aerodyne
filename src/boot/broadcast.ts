import {boot} from 'quasar/wrappers'

const broadcast = new BroadcastChannel('SW_BROADCAST');

enum MessageType {
  SUBSCRIBE,
}

export default boot(({app}) => {
  // for Options API
  app.config.globalProperties.$broadcast = broadcast;
  // for Composition API
  app.provide('broadcast', broadcast)
})

export {broadcast, MessageType};
