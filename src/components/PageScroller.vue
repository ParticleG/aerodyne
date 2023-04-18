<template>
  <q-page-sticky :offset="[38, 30]" position="bottom-right">
    <transition
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
      style="--animate-duration: 0.75s"
    >
      <q-btn
        v-show="modelValue"
        class="color-auto"
        :color="onFab ? 'accent' : undefined"
        fab
        icon="arrow_downward"
        @click="emit('click')"
        @mouseenter="onFab = true"
        @mouseleave="onFab = false"
      >
        <q-badge color="accent" floating rounded>114514</q-badge>
      </q-btn>
    </transition>
  </q-page-sticky>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface Props {
  modelValue: boolean;
  direction?: 'up' | 'down';
}

withDefaults(defineProps<Props>(), {
  direction: 'down',
});

const emit = defineEmits(['click']);

const onFab = ref(false);
</script>

<style scoped></style>
