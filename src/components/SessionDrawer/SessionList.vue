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
      v-for="(session, index) in sessions"
      :key="index"
      class="rounded-borders"
      :class="mini ? 'q-pa-sm' : undefined"
      :active="selected === index"
      active-class="active-session-item text-white"
      clickable
      v-ripple
      @click="selected = index"
    >
      <q-item-section avatar>
        <q-avatar :size="mini ? '54px' : undefined">
          <q-img :src="session.avatar" />
          <q-badge
            v-show="mini && session.unread > 0"
            color="blue"
            floating
            :label="session.unread"
            rounded
          />
        </q-avatar>
      </q-item-section>
      <q-item-section v-if="!mini">
        <q-item-label>{{ session.name }}</q-item-label>
        <q-item-label class="ellipsis" caption>
          {{ session.message.name }}: {{ session.message.text.at(-1) }}
        </q-item-label>
      </q-item-section>
      <q-item-section v-if="!mini" class="q-gutter-y-sm" side>
        <q-item-label caption>{{ session.message.stamp }}</q-item-label>
        <q-badge
          v-show="session.unread > 0"
          color="blue"
          :label="session.unread"
          rounded
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { SessionItem } from 'components/models';

import { PSEUDO_MESSAGES, PSEUDO_NAMES } from 'src/utils/constants';

export interface Props {
  modelValue: number;
  mini?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});

const emit = defineEmits(['update:modelValue']);

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const sessions = ref(new Array<SessionItem>());
for (let i = 0; i < 100; i++) {
  const name = PSEUDO_NAMES[Math.floor(Math.random() * PSEUDO_NAMES.length)];
  const text = [];
  for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
    text.push(
      PSEUDO_MESSAGES[Math.floor(Math.random() * PSEUDO_MESSAGES.length)]
    );
  }
  sessions.value.push({
    avatar: `https://cdn.quasar.dev/img/avatar${Math.ceil(
      Math.random() * PSEUDO_NAMES.length
    )}.jpg`,
    message: {
      avatar: `https://cdn.quasar.dev/img/avatar${Math.ceil(
        Math.random() * PSEUDO_NAMES.length
      )}.jpg`,
      name: name,
      sent: name === 'Me',
      stamp: 'Just now',
      text: text,
    },
    name: 'Session ' + i,
    unread: Math.round(Math.random() * 50),
  });
}
</script>

<style scoped lang="scss">
@import 'src/css/app';

.active-session-item {
  background: $accent;

  .q-item__label--caption {
    color: $grey-3;
  }
}
</style>
