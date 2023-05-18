<template>
  <div class="row justify-center">
    <div class="col-grow col-lg-10 col-xl-8">
      <q-chat-message
        v-for="(message, index) in modelValue"
        :key="index"
        :avatar="message.sender.avatarUrl"
        :bg-color="getBgColor(message.sent)"
        :name="message.sender.nickname"
        :sent="getIsSent(message.sent)"
        :stamp="getTimestamp(message.timestamp)"
        :text-color="getTextColor(message.sent)"
      >
        <div class="row q-gutter-x-sm">
          <q-card v-if="message.source" class="col-12">
            <div>
              {{ message.source.user_id }}
            </div>
          </q-card>
          <template
            v-for="(component, index) in message.components"
            :key="index"
          >
            <message-component :model-value="component" />
          </template>
          <q-tooltip>
            {{ JSON.stringify(message.components) }}
          </q-tooltip>
        </div>
      </q-chat-message>
    </div>
  </div>
</template>

<script setup lang="ts">
import humanizeDuration from 'humanize-duration';
import { useQuasar } from 'quasar';
import { onBeforeUnmount, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { OicqMessageDisplay } from 'types/OicqMessage';
import { LANG_MAP } from 'utils/constants';
import MessageComponent from 'components/ChatPage/MessageComponent.vue';

const { locale, t } = useI18n();
const { dark, screen } = useQuasar();

export interface Props {
  modelValue: OicqMessageDisplay[];
}

defineProps<Props>();

const now = ref(Date.now());

const updateInterval = setInterval(() => {
  now.value = Date.now();
}, 1000);

onBeforeUnmount(() => {
  clearInterval(updateInterval);
});

const i18n = (relativePath: string) => {
  return t('components.ChatPage.ChatList.' + relativePath);
};

const getBgColor = (isSent: boolean) => {
  if (isSent) {
    return 'primary';
  } else if (dark.isActive) {
    return 'dark';
  } else {
    return 'grey-3';
  }
};

const getIsSent = (isSent: boolean) => {
  return screen.lt.md ? false : isSent;
};

const getTimestamp = (timestamp: number) => {
  if (now.value - timestamp < 10000) {
    return i18n('labels.justNow');
  } else {
    return humanizeDuration(now.value - timestamp, {
      language: LANG_MAP[locale.value] ?? locale.value,
      largest: 1,
      units: ['d', 'h', 'm', 's', 'ms'],
    });
  }
};

const getTextColor = (isSent: boolean) => {
  if (isSent) {
    return 'white';
  } else if (dark.isActive) {
    return 'white';
  } else {
    return 'black';
  }
};
</script>

<style scoped></style>
