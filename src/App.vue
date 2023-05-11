<template>
  <router-view />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

import EndpointDialog from 'components/EndpointDialog.vue';

import { useSettingsStore } from 'stores/settings';
import { useUsersStore } from 'stores/users';
import { useMessagesStore } from 'stores/messages';

const { dialog } = useQuasar();
const { registerHandler } = useMessagesStore();
const { applyDarkMode, applyEndpoint } = useSettingsStore();
const { endpoint } = storeToRefs(useSettingsStore());
const { loggedIn } = storeToRefs(useUsersStore());

applyDarkMode();
registerHandler();

if (!endpoint.value.host) {
  dialog({
    component: EndpointDialog,
  }).onOk((backendMode: 'multiple' | 'single') => {
    if (backendMode === 'multiple' && !loggedIn.value) {
      // TODO: implement this
    }
  });
} else {
  (async () => await applyEndpoint())();
}
</script>
