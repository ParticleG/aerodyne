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
        <q-tab-panels v-model="tabIndex">
          <AccountPanel :name="1" />
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AccountPanel from 'components/AccountPanels/AccountPanel.vue';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
defineEmits([...useDialogPluginComponent.emits]);

const { t } = useI18n();
const i18n = (relativePath) => {
  return t('components.AccountDialog.' + relativePath);
};

const tabIndex = ref(1);
</script>

<style scoped></style>
