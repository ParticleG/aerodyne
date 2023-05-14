<template>
  <q-list
    :class="
      mini
        ? 'overflow-auto hide-scrollbar'
        : 'scrollbar-container ' +
          ($q.platform.is.mobile ? 'q-px-md' : 'q-pl-md')
    "
    style="height: calc(100vh - 58px)"
  >
    <q-item
      v-for="(currentRecentSender, index) in currentRecentSenders"
      :key="index"
      v-ripple
      :active="selected === index"
      :class="trueThen(mini, 'q-pa-sm')"
      active-class="active-session-item text-white"
      class="rounded-borders"
      clickable
      @click="selected = index"
    >
      <q-item-section avatar>
        <q-avatar :size="trueThen(mini, '54px')">
          <q-img :src="currentRecentSender.avatar" />
          <q-badge
            v-show="mini && currentRecentSender.unread > 0"
            :label="currentRecentSender.unread"
            color="blue"
            floating
            rounded
          />
        </q-avatar>
      </q-item-section>
      <q-item-section v-if="!mini">
        <q-item-label>{{ currentRecentSender.name }}</q-item-label>
        <q-item-label caption class="ellipsis">
          {{ currentRecentSender.message.name }}:
          {{ currentRecentSender.message.text }}
        </q-item-label>
      </q-item-section>
      <q-item-section v-if="!mini" class="q-gutter-y-sm" side>
        <q-item-label caption>{{
          currentRecentSender.message.time
        }}</q-item-label>
        <q-badge
          v-show="currentRecentSender.unread > 0"
          :label="currentRecentSender.unread"
          color="blue"
          rounded
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, ComputedRef } from 'vue';
import { MessageContainer, useMessagesStore } from 'stores/messages';
import { OicqAccount } from 'types/common';
import { trueThen } from 'utils/tools';

const { recentSenders } = storeToRefs(useMessagesStore());

const emit = defineEmits(['update:modelValue']);

export interface Props {
  modelValue: number;
  account: OicqAccount;
  mini?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});
const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const currentRecentSenders: ComputedRef<MessageContainer[]> = computed(
  () => recentSenders.value[props.account]
);

// const sessions = ref(new Array<SessionItem>());
// for (let i = 0; i < 100; i++) {
//   const name = PSEUDO_NAMES[Math.floor(Math.random() * PSEUDO_NAMES.length)];
//   const text = [];
//   for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
//     text.push(
//       PSEUDO_MESSAGES[Math.floor(Math.random() * PSEUDO_MESSAGES.length)]
//     );
//   }
//   sessions.value.push({
//     avatar: `https://cdn.quasar.dev/img/avatar${Math.ceil(
//       Math.random() * PSEUDO_NAMES.length
//     )}.jpg`,
//     message: {
//       avatar: `https://cdn.quasar.dev/img/avatar${Math.ceil(
//         Math.random() * PSEUDO_NAMES.length
//       )}.jpg`,
//       name: name,
//       sent: name === 'Me',
//       stamp: 'Just now',
//       text: text,
//     },
//     name: 'Session ' + i,
//     unread: Math.round(Math.random() * 50),
//   });
// }
</script>

<style lang="scss" scoped>
@import 'css/app';

.active-session-item {
  background: $accent;

  .q-item__label--caption {
    color: $grey-3;
  }
}
</style>
