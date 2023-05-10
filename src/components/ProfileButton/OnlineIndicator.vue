<script setup lang="ts">
import { computed, inject } from 'vue';

import { WsWrapper } from 'types/WsWrapper';

const ws: WsWrapper | undefined = inject('ws');

const color = computed(() => {
  return navigator.onLine ? (ws?.isOpen() ? 'green' : 'red') : 'grey';
});
</script>

<template>
  <q-avatar
    class="absolute-bottom-right online-indicator"
    :color="color"
    round
    size="1.15rem"
    style="margin: 10.5%; border: 0.15rem solid white"
  />
</template>

<style lang="scss" scoped>
.online-indicator {
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  transform: scale(1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 0.5rem rgba(255, 255, 255, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}
</style>
