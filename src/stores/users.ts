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
  currentUserId: UserId;
};

export const useUsersStore = defineStore('users', {
  state: (): State => ({
    users: new Map<UserId, User>(),
    currentUserId: 0,
  }),
  getters: {
    currentUser(): User | undefined {
      return this.users.get(this.currentUserId);
    },
  },
  actions: {
    addUser(user: User): boolean {
      if (this.users.has(user.id)) {
        return false;
      }
      this.users.set(user.id, user);
      this.currentUserId = user.id;
      return true;
    },
    switchUser(id: UserId): boolean {
      if (!this.users.has(id)) {
        return false;
      }
      this.currentUserId = id;
      return true;
    },
  },
  persist: {
    key: 'aerodyne.users',
  },
});
