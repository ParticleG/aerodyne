<template>
  <div class="column col-auto">
    <q-btn flat icon="menu" padding="md" />
    <q-btn flat icon="add" padding="md" @click="subscribeAccount" />
    <q-space />
    <q-toggle
      :model-value="darkMode"
      checked-icon="dark_mode"
      :color="darkModeColor"
      indeterminate-icon="o_hdr_auto"
      indeterminate-value="auto"
      keep-color
      toggle-indeterminate
      unchecked-icon="light_mode"
      @update:model-value="toggleDarkMode"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

import ClientDialog from 'components/ClientDialog.vue';
import { useSettingsStore } from 'stores/settings';

const { toggleDarkMode } = useSettingsStore();
const { darkMode, darkModeColor } = storeToRefs(useSettingsStore());
const { dialog } = useQuasar();

const subscribeAccount = () => {
  dialog({
    component: ClientDialog,
    componentProps: {
      type: 'subscribe',
    },
  });
};
</script>

<style scoped></style>
