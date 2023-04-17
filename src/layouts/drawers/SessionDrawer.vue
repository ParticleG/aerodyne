<template>
  <q-drawer
    class="bg-dark non-selectable"
    behavior="desktop"
    :bordered="$q.screen.gt.sm"
    no-swipe-close
    no-swipe-open
    persistent
    :width="mobile ? $q.screen.width : width"
    @mouseenter="showFab = true"
    @mouseleave="showFab = false"
  >
    <div class="row no-wrap">
      <div class="column col-auto">
        <q-btn flat icon="menu" padding="md" />
        <q-btn flat icon="add" padding="md" @click="manageAccount"/>
      </div>
      <div style="flex: 1 1 auto; min-width: 0">
        <q-toolbar class="q-pa-sm q-pt-xs">
          <q-input class="col-grow" clearable dense outlined rounded>
            <template v-slot:prepend>
              <q-icon color="grey" name="search" />
            </template>
          </q-input>
        </q-toolbar>
        <q-list
          class="scrollbar-dark"
          :class="$q.platform.is.mobile ? 'q-px-md' : 'q-pl-md'"
          style="height: calc(100vh - 58px)"
        >
          <q-item
            v-for="index in 100"
            :key="index"
            class="rounded-borders"
            :active="sessionId === index"
            active-class="active-session-item"
            clickable
            v-ripple
            @click="selectSession(index)"
          >
            <q-item-section avatar>
              <q-avatar>
                <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Session Item demo</q-item-label>
              <q-item-label class="ellipsis" caption>
                Tom: Have you seen Quasar???????????????????
              </q-item-label>
            </q-item-section>
            <q-item-section class="q-gutter-y-sm" side>
              <q-item-label caption>2 min ago</q-item-label>
              <q-badge color="blue" label="114514" rounded />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <DrawerResizer
      class="absolute-right full-height"
      :size="3"
      v-model="width"
    />
    <q-page-sticky :offset="[38, 20]" position="bottom-right">
      <transition
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutDown"
        style="--animate-duration: 0.75s"
      >
        <q-btn v-show="showFab" color="accent" fab icon="edit"></q-btn>
      </transition>
    </q-page-sticky>
  </q-drawer>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

import AccountDialog from 'components/AccountDialog.vue';
import DrawerResizer from 'components/DrawerResizer.vue';

export interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), {
  mobile: false,
});

const { dialog, screen } = useQuasar();

const width = ref(400);
const showFab = ref(false);

const sessionId = ref(-1);
const emit = defineEmits(['toggle:drawer']);

const selectSession = (id: number) => {
  sessionId.value = id;
  if (screen.lt.md) {
    emit('toggle:drawer', false);
  }
};

const manageAccount = () => {
  dialog({
    component: AccountDialog,
    componentProps: {},
  });
};
</script>
<style scoped lang="scss">
@import 'src/css/quasar.variables';

.active-session-item {
  color: white;
  background: $accent;
}
</style>
