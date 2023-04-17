<template>
  <q-header bordered>
    <q-toolbar class="q-px-sm q-px-lg-lg">
      <q-btn
        v-show="mobile"
        flat
        icon="menu"
        round
        text-color="grey"
        @click="openDrawer"
      />
      <q-btn :color="darkMode ? 'white' : 'black'" round>
        <q-avatar size="42px">
          <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </q-btn>
      <div class="q-ml-md">
        <div class="text-bold text-auto">Group Name Demo</div>
        <div class="text-caption text-grey">1919 Members</div>
      </div>
      <q-space />
      <q-btn flat icon="search" round text-color="grey" />
      <q-btn flat icon="more_vert" round text-color="grey" />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useSettingsStore } from 'stores/settings';

export interface Props {
  mobile?: boolean;
}

withDefaults(defineProps<Props>(), {
  mobile: false,
});

const emit = defineEmits(['toggle:drawer']);
const openDrawer = () => {
  emit('toggle:drawer', true);
};

const { darkMode } = storeToRefs(useSettingsStore());
</script>

<style scoped></style>
