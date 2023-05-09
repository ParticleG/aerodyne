<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { useUsersStore } from 'stores/users';
import ProfileMenu from 'components/ProfileButton/ProfileMenu.vue';
import { falseThen } from 'src/utils/tools';

const { currentUser } = storeToRefs(useUsersStore());

const showMenu = ref(false);
</script>

<template>
  <q-btn
    :color="$q.dark.isActive ? 'white' : 'dark'"
    :icon="falseThen(currentUser, 'login')"
    aria-label="Profile"
    no-caps
    outline
    round
    @click="showMenu = !showMenu"
  >
    <q-avatar
      v-if="currentUser"
      :icon="falseThen(currentUser.avatar, 'account_circle')"
      :text-color="$q.dark.isActive ? 'white' : 'dark'"
      size="34px"
    >
      <q-img v-if="currentUser.avatar" :src="currentUser.avatar" />
    </q-avatar>
    <profile-menu v-model="showMenu" />
  </q-btn>
</template>

<style scoped></style>
