<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { useUsersStore } from 'stores/users';
import ProfileMenu from 'components/ProfileButton/ProfileMenu.vue';

const { currentUser } = storeToRefs(useUsersStore());

const showMenu = ref(false);
</script>

<template>
  <q-btn
    aria-label="Profile"
    :color="$q.dark.isActive ? 'white' : 'dark'"
    :icon="currentUser ? undefined : 'login'"
    no-caps
    outline
    round
    @click="showMenu = !showMenu"
  >
    <q-avatar
      v-if="currentUser"
      :icon="currentUser.avatar ? undefined : 'account_circle'"
      size="34px"
      :text-color="$q.dark.isActive ? 'white' : 'dark'"
    >
      <q-img v-if="currentUser.avatar" :src="currentUser.avatar" />
    </q-avatar>
    <profile-menu v-model="showMenu" />
  </q-btn>
</template>

<style scoped></style>
