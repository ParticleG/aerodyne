<template>
  <q-separator
    v-touch-pan.stop.mouse="handleResize"
    @mouseenter.stop="resizerVisibility = 1"
    @mouseleave.stop="resizerVisibility = resizing ? 1 : 0"
    :style="{
      cursor: 'col-resize',
      opacity: resizerVisibility,
      width: `${size}px`,
    }"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { TouchPanEvent } from 'src/utils/types';

export interface Props {
  modelValue: number;
  maxWidth?: number;
  minWidth?: number;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 400,
  maxWidth: 500,
  minWidth: 300,
  size: 5,
});
const emit = defineEmits(['update:modelValue', 'update:resizing']);

const width = computed({
  get: () => props.modelValue,
  set: (e) => emit('update:modelValue', e),
});
const oldWidth = ref(width.value);

const resizing = ref(false);
const resizerVisibility = ref(0);

const result = ref(0);

const handleResize = (event: TouchPanEvent): void => {
  if (event.isFirst) {
    oldWidth.value = width.value;
  }
  // Set the resizing flag only if needed
  if (!event.isFinal && !resizing.value) {
    resizing.value = true;
  } else if (event.isFinal && resizing.value) {
    resizing.value = false;
  }
  // Set the visibility flag only if needed
  if (resizing.value && resizerVisibility.value === 0) {
    resizerVisibility.value = 1;
  } else if (!resizing.value && resizerVisibility.value === 1) {
    resizerVisibility.value = 0;
  }
  // Calculate the new width
  result.value = oldWidth.value + event.offset.x;
  result.value =
    result.value < props.minWidth
      ? props.minWidth
      : result.value > props.maxWidth
      ? props.maxWidth
      : result.value;
  // Update the width
  width.value = result.value;
};
</script>

<style scoped></style>
