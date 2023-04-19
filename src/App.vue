<template>
  <router-view />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

import EndpointDialog from 'components/EndpointDialog.vue';

import { useSettingsStore } from 'stores/settings';
import { useUsersStore } from 'stores/users';

const { dialog } = useQuasar();
const { applyDarkMode } = useSettingsStore();
const { endpoint } = storeToRefs(useSettingsStore());
const { addUser } = useUsersStore();
const { lastUser } = storeToRefs(useUsersStore());

applyDarkMode();

if (endpoint.value.host === '') {
  dialog({
    component: EndpointDialog,
  }).onOk((backendMode: 'multiple' | 'single') => {
    if (!lastUser.value) {
      if (backendMode === 'single') {
        addUser({ id: 0, username: 'Local User', permission: 'Super' });
      }
    }
  });
}
</script>
