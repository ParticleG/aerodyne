<template>
  <div class="row justify-center">
    <div class="col-grow col-lg-10 col-xl-8">
      <q-chat-message
        v-for="(message, index) in modelValue"
        :key="index"
        :avatar="
          message.message_type === 'private'
            ? currentClient.friends[message.sender.user_id]?.avatarUrl
            : message.message_type === 'discuss'
            ? currentClient.groups[message.discuss_id]?.memberMap?.[message.sender.user_id]?.avatarUrl
            : currentClient.groups[message.group_id]?.memberMap?.[message.sender.user_id]?.avatarUrl
        "
        :bg-color="
          message.sender.user_id === currentClient.account
            ? 'primary'
            : dark.isActive
            ? 'dark'
            : 'grey-3'
        "
        :name="message.sender.nickname"
        :sent="
          $q.screen.lt.md
            ? false
            : message.sender.user_id === currentClient.account
        "
        :stamp="
          now - message.time < 10000
            ? i18n('labels.justNow')
            : humanizeDuration(now - message.time, {
                language: LANG_MAP[locale] ?? locale,
                largest: 1,
                units: ['d', 'h', 'm', 's', 'ms'],
              })
        "
        :text="[message.raw_message]"
        :text-color="
          message.sender.user_id === currentClient.account
            ? 'white'
            : dark.isActive
            ? 'white'
            : 'black'
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

import { OicqMessage } from 'types/common';
import { storeToRefs } from 'pinia';
import { useClientStore } from 'stores/client';
import humanizeDuration from 'humanize-duration';
import { LANG_MAP } from 'utils/constants';
import { onBeforeUnmount, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const { currentClient } = storeToRefs(useClientStore());
const { dark } = useQuasar();

export interface Props {
  modelValue: OicqMessage[];
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
</script>

<style scoped></style>
