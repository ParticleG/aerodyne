import { RouteRecordRaw } from 'vue-router';

// noinspection JSUnusedGlobalSymbols
const routes: RouteRecordRaw[] = [
  { path: '', redirect: 'chat' },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'chat',
        path: 'chat',
        components: {
          default: () => import('pages/ChatPage.vue'),
          drawer: () => import('layouts/drawers/SessionDrawer.vue'),
          footer: () => import('layouts/footers/ChatFooter.vue'),
          header: () => import('layouts/headers/ChatHeader.vue'),
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
