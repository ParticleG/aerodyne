<template>
  <q-page ref="scrollTarget" class="row justify-center">
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
    <div class="column col-12 col-lg-10 col-xl-8">
      <q-chat-message
        v-for="(message, index) in messages"
        :key="index"
        :avatar="message.avatar"
        :bg-color="message.bgColor"
        :name="message.name"
        :sent="$q.screen.lt.md ? false : message.sent"
        :stamp="message.stamp"
        :text="message.text"
        :text-color="message.textColor"
      />
    </div>
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
          :color="onFab ? 'accent' : 'dark'"
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
    <q-scroll-observer
      :scroll-target="$refs.scrollTarget as Element"
      @scroll="onScroll"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, onMounted, ref } from 'vue';

import { PSEUDO_MESSAGES, PSEUDO_NAMES } from 'src/utils/constants';
import { ChatMessage } from 'src/utils/types';

const scrollTarget = ref(null);

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

function onScroll(event) {
  const scrollElement = (scrollTarget.value as ComponentPublicInstance)?.$el;
  inMiddle.value =
    scrollElement.scrollHeight -
      scrollElement.offsetHeight -
      event.position.top >
    53;
}

function scrollToBottom() {
  const scrollElement = (scrollTarget.value as ComponentPublicInstance)?.$el;
  scrollElement.scrollTo({
    top: scrollElement.scrollHeight + scrollElement.offsetHeight,
    behavior: 'smooth',
  });
}

onMounted(() => {
  const scrollElement = (scrollTarget.value as ComponentPublicInstance)?.$el;
  scrollElement.scrollTop = scrollElement.scrollHeight;
});
</script>

<style scoped lang="scss">
.chat-emoji {
  vertical-align: middle;
  height: 2em;
  width: 2em;
}
</style>
