import { defineStore } from 'pinia';
import { Dark } from 'quasar';

const darkModes = [false, 'auto', true] as const;
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: Dark.mode as 'auto' | boolean,
  }),

  getters: {
    darkModeColor(): string {
      switch (this.darkMode) {
        case false:
          return 'grey-5';
        case 'auto':
          return 'grey';
        default:
          return 'grey-8';
      }
    }
  },

  actions: {
    applyDarkMode() {
      Dark.set(this.darkMode);
    },
    toggleDarkMode() {
      const index = darkModes.indexOf(this.darkMode);
      this.darkMode = darkModes[(index + 1) % darkModes.length];
      this.applyDarkMode();
    },
  },
  persist: true,
});
