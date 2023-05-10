<template>
  <q-drawer
    class="non-selectable"
    behavior="desktop"
    :bordered="$q.screen.gt.sm"
    no-swipe-close
    no-swipe-open
    persistent
    :width="mobile ? $q.screen.width : width"
  >
    <div class="row no-wrap">
      <SessionSidebar />
      <q-separator vertical />
      <div style="flex: 1 1 auto; min-width: 0">
        <SessionHeader
          :mini="isMini"
          v-model="searchText"
          @keydown.enter="selectSession(0)"
        />
        <SessionList
          :model-value="selectedSession"
          :mini="isMini"
          @mouseenter="showFab = true"
          @mouseleave="showFab = false"
          @update:model-value="selectSession"
        />
      </div>
    </div>
    <DrawerResizer
      v-show="screen.gt.sm"
      class="absolute-right full-height"
      :max-width="DRAWER_WIDTHS.max"
      :min-width="DRAWER_WIDTHS.min"
      :snap-width="DRAWER_WIDTHS.snap"
      v-model="width"
    />
    <q-page-sticky :offset="[38, 20]" position="bottom-right">
      <transition
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutDown"
        style="--animate-duration: 0.75s"
      >
        <q-btn
          v-show="!mobile && !isMini && showFab"
          color="accent"
          fab
          icon="edit"
        ></q-btn>
      </transition>
    </q-page-sticky>
  </q-drawer>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';

import DrawerResizer from 'components/DrawerResizer.vue';
import SessionHeader from 'components/SessionDrawer/SessionHeader.vue';
import SessionList from 'components/SessionDrawer/SessionList.vue';
import SessionSidebar from 'components/SessionDrawer/SessionSidebar.vue';
import { DRAWER_WIDTHS } from 'utils/constants';

export interface Props {
  mobile?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mobile: false,
});

const emit = defineEmits(['toggle:drawer']);

const { screen } = useQuasar();

const width = ref(500);
const searchText = ref('');
const selectedSession = ref(-1);
const showFab = ref(false);

const isMini = computed(
  () => !props.mobile && width.value < DRAWER_WIDTHS.snap
);

const selectSession = (index: number) => {
  selectedSession.value = index;
  if (screen.lt.md) {
    emit('toggle:drawer', false);
  }
};
</script>

<style lang="scss"></style>
