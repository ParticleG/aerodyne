/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

declare const self: ServiceWorkerGlobalScope & typeof globalThis;

import {precacheAndRoute} from 'workbox-precaching';

import {broadcast, MessageType} from 'boot/broadcast';

broadcast.onmessage = (event) => {
  if (event.data) {
    switch (event.data.type) {
      case MessageType.SUBSCRIBE:
        console.log(event.data);
        break;
    }
  }
};

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

const pubKey =
  'BGzzMG2Z2ASNOXFg8S019mQNeSWD-V3dDY2BVTDTCUuZ300uyWBQCMMWTOLFPJibQqaLSBlv6f4lz3rVi8YFu30';


// self.addEventListener('message', (event) => {
//   if (event.data.type === 'GET_VERSION') {
//     event.ports[0].postMessage(SW_VERSION);
//   }
// });

self.registration.pushManager
  .getSubscription()
  .then((subscription) => {
    if (subscription) {
      return subscription;
    }
    return self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: pubKey,
    });
  })
  .then(
    (pushSubscription) => {
      console.log(pushSubscription);
      fetch('http://127.0.0.1:3000/subscribe', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          subscription: pushSubscription,
        }),
      })
        .then((r) => console.log(r))
        .catch((e) => console.log(e));
    },
    (error) => {
      console.error(error);
    }
  );

self.addEventListener('push', function (event) {
  console.log('On push event');
  console.log(event);
  event.waitUntil(
    self.registration.showNotification('TEST', {
      body: event.data ? event.data.text() : 'no payload',
    })
  );
});
