<template>
  <div class="column col-auto items-center">
    <q-btn flat icon="menu" padding="md" />
    <q-btn
      v-for="(client, key) in clients"
      :key="key"
      color="primary"
      :flat="account !== client.account"
      round
      :unelevated="account === client.account"
      @click="account = client.account"
    >
      <q-avatar>
        <q-img :src="client.avatarUrl" />
      </q-avatar>
    </q-btn>
    <q-btn flat icon="add" padding="md" @click="subscribeAccount" />
    <q-space />
    <q-separator class="full-width" />
    <div class="column items-center q-gutter-y-sm q-my-sm">
      <profile-button />
      <q-btn
        :icon="darkModeColorAndIcon.icon"
        :text-color="darkModeColorAndIcon.color"
        flat
        round
        @click="toggleDarkMode"
      >
        <q-tooltip
          anchor="center right"
          self="center left"
          transition-hide="jump-left"
          transition-show="jump-right"
        >
          {{ i18n('labels.toggleDarkMode') }}
        </q-tooltip>
      </q-btn>
      <q-btn icon="settings" flat round />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

import ClientDialog from 'components/ClientDialog.vue';
import { useSettingsStore } from 'stores/settings';
import ProfileButton from 'components/ProfileButton.vue';
import { useClientStore } from 'stores/client';
import { computed } from 'vue';

const { t } = useI18n();
const { clients } = storeToRefs(useClientStore());
const { toggleDarkMode } = useSettingsStore();
const { darkModeColorAndIcon } = storeToRefs(useSettingsStore());
const { dialog } = useQuasar();

const emit = defineEmits(['update:modelValue']);

export interface Props {
  modelValue: number;
}

const props = defineProps<Props>();
const account = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const i18n = (relativePath) => {
  return t('components.SessionDrawer.SessionSidebar.' + relativePath);
};
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
