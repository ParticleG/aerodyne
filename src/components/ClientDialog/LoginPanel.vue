<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import PasswordInput from 'components/ClientDialog/PasswordInput.vue';
import { ActionLogin, WsAction } from 'types/actions';
import { ResponseLogin } from 'types/responses';
import { WsHandler } from 'types/WsWrapper';
import { ws } from 'boot/ws';
import { storeToRefs } from 'pinia';
import { useClientStore } from 'stores/client';

const { t } = useI18n();
const { notify } = useQuasar();
const { currentAccount, externalHandlers } = storeToRefs(useClientStore());

const emit = defineEmits([
  'click:cancel',
  'click:confirm',
]);

const loading = ref(false);
const password = ref('');

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.LoginPanel.' + relativePath);
};

const loginClient = () => {
  loading.value = true;
  ws.send(new ActionLogin(currentAccount.value, password.value));
};

externalHandlers.value.set(WsAction.Login, <WsHandler<ResponseLogin>>((wsResponse) => {
  loading.value = false;
  switch (wsResponse.result) {
    case 'success':
      notify({
        type: 'positive',
        message: i18n('notifications.success'),
      });
      emit('click:confirm', wsResponse);
      break;
    case 'failure':
      notify({
        type: 'warning',
        message: i18n('notifications.failure'),
        caption: wsResponse.data.message,
      });
      break;
    case 'error':
      notify({
        type: 'negative',
        message: i18n('notifications.error'),
        caption: wsResponse.data.message,
      });
      break;
  }
}));
</script>

<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <div>
      {{ i18n('labels.account') + currentAccount }}
    </div>
    <password-input v-model="password" :loading="loading" />
    <div class="row q-gutter-x-md justify-end">
      <q-btn
        :color="$q.dark.isActive ? 'white' : 'black'"
        :label="i18n('labels.cancel')"
        flat
        @click="emit('click:cancel')"
      />
      <q-btn
        :label="i18n('labels.subscribe')"
        color="primary"
        @click="loginClient"
      />
    </div>
  </q-tab-panel>
</template>

<style scoped></style>
