<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import ProfileMenu from 'components/ProfileButton/ProfileMenu.vue';
import { useUserStore } from 'stores/user';
import { falseThen } from 'utils/common';

const { loggedIn, avatar } = storeToRefs(useUserStore());

const showMenu = ref(false);
</script>

<template>
  <q-btn
    :color="$q.dark.isActive ? 'white' : 'dark'"
    :icon="falseThen(loggedIn, 'login')"
    aria-label="Profile"
    no-caps
    outline
    round
    @click="showMenu = !showMenu"
  >
    <q-avatar
      v-if="loggedIn"
      :icon="falseThen(avatar, 'account_circle')"
      :text-color="$q.dark.isActive ? 'white' : 'dark'"
      size="34px"
    >
      <q-img v-if="avatar" :src="avatar" />
    </q-avatar>
    <profile-menu v-model="showMenu" />
  </q-btn>
</template>

<style scoped></style>
