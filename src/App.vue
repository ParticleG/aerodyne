<template>
  <router-view />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

import EndpointDialog from 'components/EndpointDialog.vue';

import { useClientStore } from 'stores/client';
import { useMessagesStore } from 'stores/messages';
import { useSettingsStore } from 'stores/settings';
import { useUserStore } from 'stores/user';

const { dialog } = useQuasar();
const { applyDarkMode, applyEndpoint } = useSettingsStore();
const { endpoint } = storeToRefs(useSettingsStore());
const { loggedIn } = storeToRefs(useUserStore());

applyDarkMode();
useClientStore().registerHandler();
useMessagesStore().registerHandler();

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
