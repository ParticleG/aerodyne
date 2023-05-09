import { defineStore } from 'pinia';
import { computed, reactive, Ref, ref } from 'vue';

import { i18nGlobal } from 'boot/i18n';

import { UserId } from 'src/utils/types';

type User = {
  id: UserId;
  username: string;
  avatar?: string;
  avatar_hash?: string;
  permission: 'Normal' | 'Admin' | 'Super';
  email?: string;
};

const { t } = i18nGlobal;

export const useUsersStore = defineStore('users', () => {
  const currentUserId: Ref<UserId> = ref(0);
  const users: Record<UserId, User> = reactive({});

  const currentUser = computed(() => users[currentUserId.value]);

  const addUser = (user?: User): boolean => {
    user = user ?? {
      id: 0,
      username: t('stores.users.labels.localUser'),
      permission: 'Super',
    };
    if (user.id in users) {
      return false;
    }
    users[user.id] = user;
    currentUserId.value = user.id;
    return true;
  };

  const switchUser = (id: UserId): boolean => {
    if (!(id in users)) {
      return false;
    }
    currentUserId.value = id;
    return true;
  };

  const removeUser = (id: UserId): boolean => {
    if (!(id in users)) {
      return false;
    }
    delete users[id];
    if (currentUserId.value === id) {
      currentUserId.value = 0;
    }
    return true;
  };

  return {
    currentUserId,
    users,
    currentUser,
    addUser,
    switchUser,
    removeUser,
  };
});
