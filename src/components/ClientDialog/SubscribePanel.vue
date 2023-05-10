<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <q-input
      v-model="accountInput.content"
      :dense="!$q.screen.gt.sm"
      :error="accountInput.error"
      :label="i18n('labels.account')"
      :loading="accountInput.loading"
      :maxlength="12"
      clearable
      outlined
      type="number"
    >
      <template v-slot:error>
        <div>
          {{ i18n('errors.account') }}
        </div>
      </template>
    </q-input>
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
import { computed, inject, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { WsAction } from 'types/WsAction';
import { WsWrapper } from 'types/WsWrapper';

const { t } = useI18n();
const { notify } = useQuasar();
const ws: WsWrapper | undefined = inject('ws');

const emit = defineEmits(['click:cancel', 'click:confirm']);

const accountInput = reactive({
  content: '',
  error: computed(() => {
    if (!accountInput.content) {
      return false;
    }
    return accountInput.content.length < 5;
  }),
  loading: false,
});

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.SubscribePanel.' + relativePath);
};

const subscribeClient = () => {
  accountInput.loading = true;
  ws?.send({
    action: WsAction.Subscribe,
    data: {
      account: Number(accountInput.content),
    },
  });
};

ws?.setHandler(WsAction.Subscribe, (data) => {
  accountInput.loading = false;
  switch (data.result) {
    case 'success':
      notify({
        type: 'positive',
        message: i18n('notifications.success'),
      });
      emit('click:confirm');
      break;
    case 'failure':
      notify({
        type: 'warning',
        message: i18n('notifications.success'),
        caption: data.data.toString(),
      });
      break;
    case 'error':
      notify({
        type: 'negative',
        message: i18n('notifications.success'),
        caption: data.data.toString(),
      });
      break;
  }
});
</script>

<style scoped></style>
