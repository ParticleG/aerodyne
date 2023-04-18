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

import { TouchPanEvent } from 'components/models';

export interface Props {
  maxWidth: number;
  minWidth: number;
  size?: number;
  snapWidth: number;
  modelValue: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 3,
});
const emit = defineEmits(['update:modelValue', 'update:resizing']);

const width = computed({
  get: () => props.modelValue,
  set: (e) => emit('update:modelValue', e),
});
const oldWidth = ref(width.value);

const resizing = ref(false);
const resizerVisibility = ref(0);

const thresholdWidth = (props.minWidth + props.snapWidth) / 2;

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
  const result = oldWidth.value + event.offset.x;
  // Update the width
  if (result < thresholdWidth) {
    width.value = props.minWidth;
  } else if (result < props.snapWidth) {
    width.value = props.snapWidth;
  } else if (result > props.maxWidth) {
    width.value = props.maxWidth;
  } else {
    width.value = result;
  }
};
</script>

<style scoped></style>
