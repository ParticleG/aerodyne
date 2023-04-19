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
  users: User[];
  lastUser: User | null;
};

export const useUsersStore = defineStore('users', {
  state: (): State => ({
    users: [],
    lastUser: null,
  }),
  getters: {
    getUserById({ users }): (id: UserId) => User | undefined {
      return (id: UserId): User | undefined => {
        return users.find((user) => user.id === id);
      };
    },
  },
  actions: {
    addUser(user: User): boolean {
      if (this.users.find((u) => u.id === user.id)) {
        return false;
      }
      this.users.push(user);
      this.lastUser = user;
      return true;
    },
    switchUser(id: UserId): boolean {
      const user = this.getUserById(id);
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
