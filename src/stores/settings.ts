import { defineStore } from 'pinia';
import { AddressbarColor, colors, Dark } from 'quasar';

import { $axios } from 'boot/axios';

const { getPaletteColor } = colors;
const darkModes = [false, 'auto', true] as const;
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: Dark.mode as 'auto' | boolean,
    endpoint: {
      host: '' as string,
      port: 0 as number,
    },
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
    async setEndpoint(
      host: string,
      port: number,
      ssl: boolean
    ): Promise<boolean> {
      try {
        $axios.create(`${ssl ? 'https' : 'http'}://${host}:${port}`);
        $axios.api?.get('/');
        this.endpoint.host = host;
        this.endpoint.port = port;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  persist: true,
});
