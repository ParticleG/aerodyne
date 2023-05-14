<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { computed, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import PasswordInput from 'components/ClientDialog/PasswordInput.vue';
import { ActionLogin, WsAction } from 'types/actions';
import { ResponseLogin } from 'types/responses';
import { WsHandler, WsWrapper } from 'types/WsWrapper';
import { LoginData } from 'types/LoginData';

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
const password = ref('');

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.LoginPanel.' + relativePath);
};

const loginClient = () => {
  loading.value = true;
  ws?.send(new ActionLogin(Number(account.value), password.value));
};

ws?.setHandler(WsAction.Login, <WsHandler<ResponseLogin>>((data) => {
  loading.value = false;
  switch (data.result) {
    case 'success':
      notify({
        type: 'positive',
        message: i18n('notifications.success'),
      });
      emit('click:confirm', data.data);
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
}));
</script>

<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <div>
      {{ i18n('labels.account') + account }}
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
