<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useSettingsStore } from 'stores/settings';
import { ClientState } from 'types/ClientState';
import { LoginData } from 'types/LoginData';

const { httpUrl } = storeToRefs(useSettingsStore());

const emit = defineEmits(['click:cancel', 'click:confirm']);

export interface Props {
  modelValue: string;
  data?: LoginData;
}

const props = defineProps<Props>();

const url = computed(() => {
  switch (props.data?.state) {
    case ClientState.WaitingSlider:
      return `${httpUrl}/oicq/slider${new URL(props.data.url).search}&account=${
        props.modelValue
      }`;
  }
  return undefined;
});
</script>

<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <iframe v-if="url" :src="url" />
  </q-tab-panel>
</template>

<style scoped></style>
