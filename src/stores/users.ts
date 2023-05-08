import { defineStore, storeToRefs } from 'pinia';
import { UserId } from 'src/utils/types';
import { $axios } from 'boot/axios';
import { wsMap, WsWrapper } from 'boot/accounts';

type User = {
  id: UserId;
  username: string;
  avatar?: string;
  avatar_hash?: string;
  permission: 'Normal' | 'Admin' | 'Super';
  email?: string;
};

export const useUsersStore = defineStore('users', {
  state: () => ({
    currentUserId: 0 as UserId,
    endpoint: {
      host: '' as string,
      port: 0 as number,
      ssl: false as boolean,
    },
    users: new Map<UserId, User>() as Map<UserId, User>,
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
    async setEndpoint(
      host: string,
      port: number,
      ssl: boolean
    ): Promise<boolean> {
      this.endpoint.host = host;
      this.endpoint.port = port;
      this.endpoint.ssl = ssl;
      return await this.applyEndpoint();
    },
    async applyEndpoint(): Promise<boolean> {
      const hostString = `${this.endpoint.host}:${this.endpoint.port}`;
      try {
        $axios.create(
          `${this.endpoint.ssl ? 'https' : 'http'}://${hostString}`
        );
        await $axios.api?.get('/');
        const { currentUserId } = storeToRefs(useUsersStore());
        wsMap.set(
          currentUserId.value,
          new WsWrapper(
            `${this.endpoint.ssl ? 'wss' : 'ws'}://${hostString}/oicq`
          )
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  persist: {
    key: 'aerodyne.users',
  },
});
