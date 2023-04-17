<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin hide-scrollbar"
      style="min-width: 30rem; max-width: 90vw"
    >
      <q-card-section>
        <div class="text-h6">{{ i18n(`labels.title`) }}</div>
      </q-card-section>
      <q-card-section>
        <AccountPanel />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useI18n } from 'vue-i18n';

import AccountPanel from 'components/AccountPanels/AccountPanel.vue';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
defineEmits([...useDialogPluginComponent.emits]);

const { t } = useI18n();
const i18n = (relativePath) => {
  return t('components.AccountDialog.' + relativePath);
};
</script>

<style scoped></style>
