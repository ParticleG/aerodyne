<template>
  <div class="column q-gutter-y-md">
    <q-btn label="Subscribe" @click="Subscribe" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { MessageType } from 'boot/broadcast';

const broadcast: BroadcastChannel | undefined = inject('broadcast');
const Subscribe = async () => {
  // noinspection TypeScriptUnresolvedReference
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification');
  }
  broadcast?.postMessage({
    type: MessageType.SUBSCRIBE,
  });
};
</script>

<style scoped></style>
