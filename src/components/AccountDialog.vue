<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin hide-scrollbar"
      style="min-width: 30rem; max-width: 90vw"
    >
      <q-card-section>
        <div class="text-h6">{{ i18n(`labels.titles.${type}`) }}</div>
      </q-card-section>
      <q-card-section>
        <q-tab-panels v-model="tabIndex">
          <AccountPanel :name="1" @click:cancel="hide" />
        </q-tab-panels>
        <q-tab-panels v-model="tabIndex">
          <SubscribePanel
            :name="2"
            @click:cancel="hide"
            @click:confirm="tabIndex += 1"
          />
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QDialog, useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AccountPanel from 'components/AccountDialog/AccountPanel.vue';
import SubscribePanel from 'components/AccountDialog/SubscribePanel.vue';

export interface Props {
  type: 'account' | 'subscribe' | 'login';
}

const props = defineProps<Props>();

const { dialogRef, onDialogHide } = useDialogPluginComponent();
defineEmits([...useDialogPluginComponent.emits]);

const { t } = useI18n();
const i18n = (relativePath) => {
  return t('components.AccountDialog.' + relativePath);
};

const tabIndex = ref(
  props.type === 'account' ? 1 : props.type === 'subscribe' ? 2 : 3
);

const hide = () => {
  (dialogRef.value as QDialog).hide();
};
</script>

<style scoped></style>
