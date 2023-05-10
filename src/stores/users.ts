import { defineStore } from 'pinia';
import { computed, ref, Ref } from 'vue';

import { i18nGlobal } from 'boot/i18n';
import { UserId } from 'types/common';

type User = {
  id: UserId;
  username?: string;
  avatar?: string;
  avatar_hash?: string;
  permission?: 'Normal' | 'Admin' | 'Super';
  email?: string;
};

const { t } = i18nGlobal;

export const useUsersStore = defineStore('users', () => {
  const id: Ref<UserId> = ref(-1);
  const username: Ref<string | undefined> = ref();
  const avatar: Ref<string | undefined> = ref();
  const avatar_hash: Ref<string | undefined> = ref();
  const permission: Ref<'Normal' | 'Admin' | 'Super' | undefined> = ref();
  const email: Ref<string | undefined> = ref();

  const loggedIn = computed(() => id.value >= 0);

  const login = (newUser?: User): boolean => {
    if (loggedIn.value) {
      return false;
    }
    newUser = newUser ?? {
      id: 0,
      username: t('stores.users.labels.localUser'),
      permission: 'Super',
    };
    id.value = newUser.id;
    username.value = newUser.username;
    avatar.value = newUser.avatar;
    avatar_hash.value = newUser.avatar_hash;
    permission.value = newUser.permission;
    email.value = newUser.email;
    return true;
  };

  const logout = () => {
    id.value = -1;
    username.value = undefined;
    avatar.value = undefined;
    avatar_hash.value = undefined;
    permission.value = undefined;
    email.value = undefined;
  };

  return {
    id,
    username,
    avatar,
    avatar_hash,
    permission,
    email,
    loggedIn,
    login,
    logout,
  };
});
