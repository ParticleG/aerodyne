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
      :active="selected === getUuid(currentRecentSender)"
      :class="trueThen(mini, 'q-pa-sm')"
      active-class="active-session-item text-white"
      class="rounded-borders"
      clickable
      @click="selected = getUuid(currentRecentSender)"
    >
      <q-item-section avatar>
        <q-avatar :size="trueThen(mini, '54px')">
          <q-img :src="currentRecentSender.avatarUrl" />
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
        <q-item-label caption>
          {{
            now - currentRecentSender.message.time < 10000
              ? i18n('labels.justNow')
              : humanizeDuration(now - currentRecentSender.message.time, {
                  language: LANG_MAP[locale] ?? locale,
                  largest: 1,
                  units: ['d', 'h', 'm', 's', 'ms'],
                })
          }}
        </q-item-label>
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
import humanizeDuration from 'humanize-duration';
import { storeToRefs } from 'pinia';
import { computed, onBeforeUnmount, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useClientStore } from 'stores/client';
import { getUuid, trueThen } from 'utils/common';
import { LANG_MAP } from 'utils/constants';

const { locale, t } = useI18n();
const { currentRecentSenders } = storeToRefs(useClientStore());

const emit = defineEmits(['update:modelValue']);

export interface Props {
  modelValue: string;
  mini?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const now = ref(Date.now());

const updateInterval = setInterval(() => {
  now.value = Date.now();
}, 1000);

onBeforeUnmount(() => {
  clearInterval(updateInterval);
});

const i18n = (relativePath: string) => {
  return t('components.SessionDrawer.SessionList.' + relativePath);
};
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
