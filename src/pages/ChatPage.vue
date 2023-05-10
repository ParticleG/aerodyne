<template>
  <q-page ref="scrollTarget" class="flex flex-center">
    <q-infinite-scroll
      class="full-width"
      :scroll-target="scrollTarget as Element"
      reverse
      @load="onLoad"
    >
      <ChatList v-model="messages" />
      <template v-slot:loading>
        <q-page-sticky class="z-top" :offset="[38, 30]" position="top-right">
          <q-card flat bordered>
            <q-card-section>
              <div class="row items-center q-gutter-sm">
                <q-spinner-bars size="md" />
                <div>{{ i18n('labels.loading') }}</div>
              </div>
            </q-card-section>
          </q-card>
        </q-page-sticky>
      </template>
    </q-infinite-scroll>
    <PageScroller v-model="inMiddle" @click="scrollToBottom" />
    <q-scroll-observer
      :scroll-target="$refs.scrollTarget as Element"
      @scroll="onScroll"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ChatMessage } from 'components/models';
import ChatList from 'components/ChatPage/ChatList.vue';
import PageScroller from 'components/PageScroller.vue';
import { PSEUDO_MESSAGES, PSEUDO_NAMES } from 'utils/constants';
import { sleep } from 'utils/tools';

const { t } = useI18n();
const i18n = (relativePath) => {
  return t('pages.ChatPage.' + relativePath);
};

const scrollTarget = ref(null);
const messages = ref(new Array<ChatMessage>());
const loading = ref(false);
const inMiddle = ref(false);

const getMessage = async () => {
  let newMessages = new Array<ChatMessage>();
  for (let index = 0; index < Math.ceil(20 + Math.random() * 20); index++) {
    const name = PSEUDO_NAMES[Math.floor(Math.random() * PSEUDO_NAMES.length)];
    const text = [];
    for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
      text.push(
        PSEUDO_MESSAGES[Math.floor(Math.random() * PSEUDO_MESSAGES.length)]
      );
    }
    const message = {
      avatar: `https://cdn.quasar.dev/img/avatar${Math.ceil(
        Math.random() * PSEUDO_NAMES.length
      )}.jpg`,
      name: name,
      sent: name === 'Me',
      stamp: 'Just now',
      text: text,
    };
    newMessages.push(message);
  }
  await sleep(Math.ceil(Math.random() * 2000));
  messages.value.splice(0, 0, ...newMessages);
  return newMessages.length;
};

function onScroll() {
  const scrollElement = (scrollTarget.value as ComponentPublicInstance)?.$el;
  inMiddle.value =
    scrollElement.scrollHeight -
      scrollElement.offsetHeight -
      scrollElement.scrollTop >
    53;
}

const scrollToBottom = () => {
  const scrollElement = (scrollTarget.value as ComponentPublicInstance)?.$el;
  scrollElement.scrollTo({
    top: scrollElement.scrollHeight + scrollElement.offsetHeight,
    behavior: 'smooth',
  });
};

const onLoad = async (_, done) => {
  loading.value = true;
  let needScroll = false;
  if (messages.value.length === 0) {
    needScroll = true;
  }
  await getMessage();
  done();
  loading.value = false;
  if (needScroll) {
    setTimeout(() => scrollToBottom());
  }
};

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped lang="scss">
@import 'css/app';

body.body--light {
  .q-page {
    background-color: $light-page;
  }
}

.chat-emoji {
  height: 2em;
  vertical-align: middle;
  width: 2em;
}
</style>
