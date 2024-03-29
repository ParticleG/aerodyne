import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

import { broadcast } from 'boot/broadcast';
import { MessageType } from 'types/MessageType';

declare const self: ServiceWorkerGlobalScope & typeof globalThis;

const getPublicKey = async () => {
  const response = await fetch('http://127.0.0.1:3000/service/key', {
    method: 'get',
  });
  const body = await response.json();
  return body.data;
};

broadcast.onmessage = async (event) => {
  if (event.data) {
    switch (event.data.type) {
      case MessageType.SUBSCRIBE:
        let subscription =
          await self.registration.pushManager.getSubscription();
        if (subscription === null) {
          console.log('No subscription, creating one');
          subscription = await self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: await getPublicKey(),
          });
        }
        const response = fetch('http://127.0.0.1:3000/service/subscribe', {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            subscription: subscription,
          }),
        });
        console.log(await response);
        break;
    }
  }
};

self.skipWaiting().then();
clientsClaim();

// Use with pre-cache injection
precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

self.addEventListener('push', function (event) {
  console.log('On push event');
  if (event.data) {
    const data = event.data.json();
    console.log(data);
    event.waitUntil(
      self.registration.showNotification(data.title, {
        actions: [
          {
            action: 'confirm',
            title: 'Hooray!',
          },
        ],
        body: data.body,
      })
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('On notification click: ', event.notification.title);
  console.log(event.action);
  event.notification.close();
  if (event.action === 'confirm') {
    console.log('Confirm was chosen');
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    });
  }
});

/*

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  );
}
*/
