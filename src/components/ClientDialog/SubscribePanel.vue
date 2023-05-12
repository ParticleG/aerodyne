<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <account-input v-model="account" :loading="loading" />
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
import { useQuasar } from 'quasar';
import { computed, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AccountInput from 'components/ClientDialog/AccountInput.vue';
import { ActionClientInfo, ActionSubscribe } from 'types/actions';
import { WsAction } from 'types/WsAction';
import { WsWrapper } from 'types/WsWrapper';
import { ClientState } from 'types/ClientState';

const { t } = useI18n();
const { notify } = useQuasar();
const ws: WsWrapper | undefined = inject('ws');

const emit = defineEmits([
  'click:cancel',
  'click:confirm',
  'update:modelValue',
]);

export interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
const account = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const loading = ref(false);

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.SubscribePanel.' + relativePath);
};

const subscribeClient = () => {
  loading.value = true;
  ws?.send(new ActionSubscribe(Number(account.value)));
};

ws?.setHandler(WsAction.Subscribe, (data) => {
  loading.value = false;
  switch (data.result) {
    case 'success':
      notify({
        type: 'positive',
        message: i18n('notifications.success'),
      });
      if ((data.data as ClientState) === ClientState.Online) {
        ws?.send(new ActionClientInfo(Number(account.value)));
        emit('click:cancel');
      } else {
        emit('click:confirm');
      }
      break;
    case 'failure':
      notify({
        type: 'warning',
        message: i18n('notifications.failure'),
        caption: data.data.message,
      });
      console.log(data);
      break;
    case 'error':
      notify({
        type: 'negative',
        message: i18n('notifications.error'),
        caption: data.data.message,
      });
      console.log(data);
      break;
  }
});
</script>

<style scoped></style>
