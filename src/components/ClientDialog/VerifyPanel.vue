<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSettingsStore } from 'stores/settings';
import { ClientState } from 'types/ClientState';
import { LoginData } from 'types/LoginData';
import { WsAction } from 'types/WsAction';
import { WsWrapper } from 'types/WsWrapper';

const { t } = useI18n();
const { notify } = useQuasar();
const { httpUrl } = storeToRefs(useSettingsStore());
const ws: WsWrapper | undefined = inject('ws');

const emit = defineEmits(['click:cancel', 'click:confirm']);

export interface Props {
  modelValue?: LoginData;
  account: string;
}

const props = defineProps<Props>();

const url = computed(() => {
  switch (props.modelValue?.state) {
    case ClientState.WaitingSlider:
      return `${httpUrl.value}/oicq/slider${
        new URL(props.modelValue.url).search
      }&account=${props.account}`;
  }
  return undefined;
});

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.VerifyPanel.' + relativePath);
};

ws?.setHandler(WsAction.Login, (data) => {
  switch (data.result) {
    case 'success':
      notify({
        type: 'positive',
        message: i18n('notifications.success'),
      });
      emit('click:confirm', <LoginData>data.data);
      break;
    case 'failure':
      notify({
        type: 'warning',
        message: i18n('notifications.failure'),
        caption: data.data.message,
      });
      console.log(data);
      emit('click:cancel');
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

<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <div>
      {{ i18n('labels.account') + account }}
    </div>
    <q-responsive :ratio="1" class="full-width">
      <iframe
        v-if="props.modelValue?.state === ClientState.WaitingSlider"
        :src="url"
        class="fit rounded-borders"
        style="border: 0"
      />
    </q-responsive>
    <div class="row q-gutter-x-md justify-end">
      <q-btn
        :color="$q.dark.isActive ? 'white' : 'black'"
        :label="i18n('labels.cancel')"
        flat
        @click="emit('click:cancel')"
      />
    </div>
  </q-tab-panel>
</template>

<style scoped></style>
