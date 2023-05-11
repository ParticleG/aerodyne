<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar" style="max-width: 80vw">
      <q-card-section>
        <div class="text-h6">{{ i18n(`labels.titles.${type}`) }}</div>
      </q-card-section>
      <q-card-section>
        <q-tab-panels v-model="tabIndex">
          <info-panel :name="1" @click:cancel="onDialogHide" />
        </q-tab-panels>
        <q-tab-panels v-model="tabIndex">
          <subscribe-panel
            v-model="account"
            :name="2"
            @click:cancel="onDialogHide"
            @click:confirm="tabIndex += 1"
          />
          <login-panel
            v-model="account"
            :name="3"
            @click:cancel="tabIndex -= 1"
            @click:confirm="handleLoginConfirm"
          />
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QDialog, useDialogPluginComponent } from 'quasar';
import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import InfoPanel from 'components/ClientDialog/InfoPanel.vue';
import SubscribePanel from 'components/ClientDialog/SubscribePanel.vue';
import LoginPanel from 'components/ClientDialog/LoginPanel.vue';
import { LoginData } from 'types/LoginData';
import { ClientState } from 'types/ClientState';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const { t } = useI18n();

defineEmits([...useDialogPluginComponent.emits]);

export interface Props {
  type: 'account' | 'subscribe' | 'login';
}

const props = defineProps<Props>();
const tabIndex = ref(
  props.type === 'account' ? 1 : props.type === 'subscribe' ? 2 : 3
);

const account = ref('');
const loginData: Ref<undefined | LoginData> = ref();

const i18n = (relativePath) => {
  return t('components.ClientDialog.' + relativePath);
};

const handleLoginConfirm = (data: LoginData) => {
  if (data.state === ClientState.Online) {
    onDialogHide();
    return;
  } else {
    loginData.value = data;
    tabIndex.value += 1;
  }
};
</script>

<style scoped></style>
