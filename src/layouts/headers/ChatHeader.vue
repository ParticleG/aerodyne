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
      <q-btn :color="dark.isActive ? 'white' : 'black'" round>
        <q-avatar size="42px">
          <q-img :src="currentMessageContainer?.avatarUrl" />
        </q-avatar>
      </q-btn>
      <div class="q-ml-md">
        <div
          v-if="currentMessageContainer?.type === 'group'"
          class="text-bold text-auto"
        >
          {{
            (currentClient.groups[currentMessageContainer.id] as GroupData)
              .member_count
          }}
        </div>
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
import { useQuasar } from 'quasar';

import { useClientStore } from 'stores/client';
import { GroupData } from 'types/ClientInfo';

const { dark } = useQuasar();
const { currentClient, currentMessageContainer } = storeToRefs(
  useClientStore()
);

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
</script>

<style scoped lang="scss">
@import 'css/app';

body.body--dark {
  .q-header {
    background-color: $dark;
  }
}

body.body--light {
  .q-header {
    background-color: $light;
  }
}
</style>
