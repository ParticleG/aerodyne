<template>
  <div class="row justify-center">
    <div class="col-grow col-lg-10 col-xl-8">
      <q-chat-message
        v-for="(message, index) in modelValue"
        :key="index"
        :avatar="message.avatar"
        :bg-color="
          message.name === 'Me' ? 'primary' : dark.isActive ? 'dark' : 'grey-3'
        "
        :name="message.name"
        :sent="$q.screen.lt.md ? false : message.sent"
        :stamp="message.stamp"
        :text="message.text"
        :text-color="
          message.name === 'Me' ? 'white' : dark.isActive ? 'white' : 'black'
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

import { ChatMessage } from 'components/models';

export interface Props {
  modelValue: Array<ChatMessage>;
}

defineProps<Props>();

const { dark } = useQuasar();
</script>

<style scoped></style>
