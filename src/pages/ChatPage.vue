<template>
  <q-page class="column justify-center">
    <!--    <div-->
    <!--      class="absolute-full"-->
    <!--      style="-->
    <!--        background: linear-gradient(-->
    <!--          to right bottom,-->
    <!--          #594d88 10%,-->
    <!--          #342e46 50%,-->
    <!--          #24687f 90%-->
    <!--        );-->
    <!--        -webkit-mask-image: url('chatPatterns/pattern-5.svg');-->
    <!--        mask-image: url('chatPatterns/pattern-5.svg');-->
    <!--      "-->
    <!--    />-->
    <q-virtual-scroll
      ref="virtualScroll"
      class="scrollbar-page"
      :class="$q.platform.is.mobile ? 'q-px-md' : 'q-pl-md'"
      :items="messages"
      separator
      virtual-scroll-item-size="80"
      virtual-scroll-slice-ratio-after="1"
      virtual-scroll-slice-ratio-before="2"
      virtual-scroll-slice-size="50"
      v-slot="{ item, index }"
      style="height: calc(100vh - 122px)"
      @virtual-scroll="onVirtualScroll"
    >
      <div class="row justify-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <q-chat-message
            :key="index"
            :avatar="item.avatar"
            :bg-color="item.bgColor"
            :name="item.name"
            :sent="$q.screen.lt.md ? false : item.sent"
            :stamp="item.stamp"
            :text="item.text"
            :text-color="item.textColor"
          />
        </div>
      </div>
    </q-virtual-scroll>
    <q-page-sticky
      :offset="[38, 30]"
      position="bottom-right"
      :scroll-offset="20"
    >
      <transition
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutDown"
        style="--animate-duration: 0.75s"
      >
        <q-btn
          v-show="inMiddle"
          class="color-auto"
          :color="onFab ? 'accent' : undefined"
          fab
          icon="arrow_downward"
          @click="scrollToBottom"
          @mouseenter="onFab = true"
          @mouseleave="onFab = false"
        >
          <q-badge color="accent" floating rounded>114514</q-badge>
        </q-btn>
      </transition>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { PSEUDO_MESSAGES, PSEUDO_NAMES } from 'src/utils/constants';
import { ChatMessage } from 'src/utils/types';
import { QVirtualScroll } from 'quasar';

const virtualScroll = ref(null);

const messages = ref(new Array<ChatMessage>());
for (let index = 0; index < 100; index++) {
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
    bgColor: name === 'Me' ? 'primary' : 'dark',
    name: name,
    sent: name === 'Me',
    stamp: 'Just now',
    text: text,
    textColor: 'white',
  };
  messages.value.push(message);
}

const inMiddle = ref(false);
const onFab = ref(false);

function onVirtualScroll({ index }) {
  inMiddle.value = index < messages.value.length - 1;
}

function scrollToBottom() {
  const { scrollTo } = virtualScroll.value as QVirtualScroll;
  scrollTo(messages.value.length - 1);
}

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
