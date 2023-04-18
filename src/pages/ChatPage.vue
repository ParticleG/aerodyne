<template>
  <q-page ref="scrollTarget" class="flex flex-center">
    <q-infinite-scroll
      class="full-width"
      :scroll-target="scrollTarget as Element"
      reverse
      @load="onLoad"
    >
      <div class="row justify-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <q-chat-message
            v-for="(message, index) in messages"
            :key="index"
            :avatar="message.avatar"
            :bg-color="
              message.name === 'Me'
                ? 'primary'
                : dark.isActive
                ? 'dark'
                : 'grey-4'
            "
            :name="message.name"
            :sent="$q.screen.lt.md ? false : message.sent"
            :stamp="message.stamp"
            :text="message.text"
            :text-color="
              message.name === 'Me'
                ? 'white'
                : dark.isActive
                ? 'white'
                : 'black'
            "
          />
        </div>
      </div>
      <template v-slot:loading>
        <q-page-sticky class="z-top" :offset="[38, 30]" position="top-right">
          <q-card flat bordered>
            <q-card-section>
              <div class="row items-center q-gutter-sm">
                <q-spinner-bars size="md" />
                <div>loading messages...</div>
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
import { useQuasar } from 'quasar';
import { ComponentPublicInstance, onMounted, ref } from 'vue';

import PageScroller from 'components/PageScroller.vue';

import { PSEUDO_MESSAGES, PSEUDO_NAMES } from 'src/utils/constants';
import { sleep } from 'src/utils/tools';
import { ChatMessage } from 'src/utils/types';

const { dark } = useQuasar();

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
.chat-emoji {
  vertical-align: middle;
  height: 2em;
  width: 2em;
}
</style>
