<template>
  <q-page class="row items-center justify-evenly">
    <div class="column q-gutter-y-md">
      <q-btn label="Request Permission" @click="requestNotificationPermission"/>
      <q-btn label="Subscribe" @click="Subscribe"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {inject} from 'vue';
import {MessageType} from 'boot/broadcast';

const broadcast : BroadcastChannel | undefined = inject('broadcast');
const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification');
  }
};
const Subscribe = () => {
  broadcast?.postMessage({
    type: MessageType.SUBSCRIBE
  });
};
</script>
