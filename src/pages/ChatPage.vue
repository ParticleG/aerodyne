<template>
  <q-page ref="scrollTarget" class="flex flex-center">
    <q-infinite-scroll
      class="full-width"
      :scroll-target="scrollTarget as Element"
      reverse
      @load="onLoad"
    >
      <ChatList v-model="currentMessages" />
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

import ChatList from 'components/ChatPage/ChatList.vue';
import PageScroller from 'components/PageScroller.vue';
import { storeToRefs } from 'pinia';
import { useClientStore } from 'stores/client';

const { t } = useI18n();
const { currentMessages } = storeToRefs(useClientStore());



const scrollTarget = ref(null);
const loading = ref(false);
const inMiddle = ref(false);

const i18n = (relativePath) => {
  return t('pages.ChatPage.' + relativePath);
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
  if (currentMessages.value.length === 0) {
    needScroll = true;
  }
  // await getMessage();
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
