import { defineStore } from 'pinia';
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: false,
  }),

  getters: {},

  actions: {
  },
  persist: true,
});
