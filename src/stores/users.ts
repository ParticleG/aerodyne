import { defineStore } from 'pinia';
import { UserId } from 'src/utils/types';

type User = {
  id: UserId;
  username: string;
  avatar?: string;
  avatar_hash?: string;
  permission: 'Normal' | 'Admin' | 'Super';
  email?: string;
};

type State = {
  users: Map<UserId, User>;
  lastUser: User | null;
};

export const useUsersStore = defineStore('users', {
  state: (): State => ({
    users: new Map<UserId, User>(),
    lastUser: null,
  }),
  getters: {},
  actions: {
    addUser(user: User): boolean {
      if (this.users.has(user.id)) {
        return false;
      }
      this.users.set(user.id, user);
      this.lastUser = user;
      return true;
    },
    switchUser(id: UserId): boolean {
      const user = this.users.get(id);
      if (!user) {
        return false;
      }
      this.lastUser = user;
      return true;
    },
  },
  persist: {
    key: 'aerodyne.users',
  },
});
