import { defineStore } from 'pinia';
import { AddressbarColor, colors, Dark } from 'quasar';

const { getPaletteColor } = colors;
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
    },
  },

  actions: {
    applyDarkMode() {
      Dark.set(this.darkMode);
      AddressbarColor.set(
        Dark.isActive ? getPaletteColor('grey-10') : getPaletteColor('grey-2')
      );
    },
    toggleDarkMode() {
      const index = darkModes.indexOf(this.darkMode);
      this.darkMode = darkModes[(index + 1) % darkModes.length];
      this.applyDarkMode();
    },
  },
  persist: true,
});
