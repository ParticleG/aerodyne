<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <account-input v-model="currentAccount" :loading="loading" />
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
        @click="subscribeClient"
      />
    </div>
  </q-tab-panel>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ws } from 'boot/ws';
import AccountInput from 'components/ClientDialog/AccountInput.vue';
import { useClientStore } from 'stores/client';
import { ActionSubscribe, WsAction } from 'types/actions';
import { ClientState } from 'types/ClientState';
import { WsHandler } from 'types/WsWrapper';
import { ResponseSubscribe } from 'types/responses';

const { t } = useI18n();
const { notify } = useQuasar();
const { currentAccount, externalHandlers } = storeToRefs(useClientStore());

const emit = defineEmits(['click:cancel', 'click:confirm']);

const loading = ref(false);

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.SubscribePanel.' + relativePath);
};

const subscribeClient = () => {
  loading.value = true;
  ws.send(new ActionSubscribe(currentAccount.value));
};

externalHandlers.value.set(WsAction.Subscribe, <WsHandler<ResponseSubscribe>>((wsResponse) => {
  loading.value = false;
  switch (wsResponse.result) {
    case 'success':
      notify({
        type: 'positive',
        message: i18n('notifications.success'),
      });
      if (wsResponse.data === ClientState.Online) {
        emit('click:cancel');
      } else {
        emit('click:confirm');
      }
      break;
    case 'failure':
      notify({
        type: 'warning',
        message: i18n('notifications.failure'),
        caption: wsResponse.data.message,
      });
      console.log(wsResponse);
      break;
    case 'error':
      notify({
        type: 'negative',
        message: i18n('notifications.error'),
        caption: wsResponse.data.message,
      });
      console.log(wsResponse);
      break;
  }
}));
</script>

<style scoped></style>
