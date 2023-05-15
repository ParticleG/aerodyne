<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ws } from 'boot/ws';
import SmsInput from 'components/ClientDialog/SmsInput.vue';
import { useSettingsStore } from 'stores/settings';
import { ClientState } from 'types/ClientState';
import { ActionLogin, WsAction } from 'types/actions';
import { useClientStore } from 'stores/client';
import { ResponseLogin } from 'types/responses';

const { t } = useI18n();
const { notify } = useQuasar();
const { httpUrl } = storeToRefs(useSettingsStore());

const emit = defineEmits(['click:cancel', 'click:confirm']);

const { currentAccount, externalHandlers } = storeToRefs(useClientStore());

export interface Props {
  modelValue?: ResponseLogin;
}

const props = defineProps<Props>();

const url = computed(() => {
  switch (props.modelValue?.data.state) {
    case ClientState.WaitingSlider:
      return `${httpUrl.value}/oicq/slider${
        new URL(props.modelValue?.data.url ?? '').search
      }&account=${currentAccount.value}`;
  }
  return undefined;
});

const code = ref('');
const loading = ref(false);

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.VerifyPanel.' + relativePath);
};

const loginClient = () => {
  loading.value = true;
  ws.send(new ActionLogin(currentAccount.value, code.value));
};

externalHandlers.value.set(WsAction.Login, (wsResponse) => {
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
      console.log(wsResponse);
      emit('click:cancel');
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
});
</script>

<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <div>
      {{ i18n('labels.account') + currentAccount }}
    </div>
    <q-responsive
      v-if="props.modelValue?.data.state === ClientState.WaitingSlider"
      :ratio="1"
      class="full-width"
    >
      <iframe :src="url" class="fit rounded-borders" style="border: 0" />
    </q-responsive>
    <sms-input
      v-if="props.modelValue?.data.state === ClientState.WaitingSmsCode"
      v-model="code"
      :loading="loading"
    />
    <div class="row q-gutter-x-md justify-end">
      <q-btn
        :color="$q.dark.isActive ? 'white' : 'black'"
        :label="i18n('labels.cancel')"
        flat
        @click="emit('click:cancel')"
      />
      <q-btn
        :label="i18n('labels.verify')"
        color="primary"
        @click="loginClient"
      />
    </div>
  </q-tab-panel>
</template>

<style scoped></style>
