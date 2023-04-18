<template>
  <div
    class="absolute-full"
    :style="{
      background: background,
      webkitMaskImage: `url('${modelValue}')`,
      maskImage: `url('${modelValue}')`,
    }"
  />
</template>

<script setup lang="ts">
export interface Props {
  modelValue: string;
  background?: string;
}

withDefaults(defineProps<Props>(), {
  background:
    'linearGradient(to right bottom, #594d88 10%, #342e46 50%, #24687f 90%)',
});
</script>

<style scoped></style>
