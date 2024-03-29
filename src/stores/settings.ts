import { defineStore, storeToRefs } from 'pinia';
import { AddressbarColor, colors, Dark } from 'quasar';
import { computed, reactive, Ref, ref } from 'vue';

import { ws } from 'boot/ws';
import { $axios } from 'boot/axios';

import { useUserStore } from 'stores/user';

type Endpoint = {
  host: string;
  port: number;
  ssl: boolean;
  local: boolean;
};

const { getPaletteColor } = colors;
const darkModes = [false, 'auto', true] as const;

const getHttp = (endpoint: Endpoint) => {
  const { host, port, ssl } = endpoint;
  return `${ssl ? 'https' : 'http'}://${host}:${port}`;
};
const getWs = (endpoint: Endpoint) => {
  const { host, port, ssl } = endpoint;
  return `${ssl ? 'wss' : 'ws'}://${host}:${port}/oicq`;
};

export const useSettingsStore = defineStore('settings', () => {
  const darkMode: Ref<'auto' | boolean> = ref(Dark.mode);
  const endpoint: Endpoint = reactive({
    host: '',
    port: 0,
    ssl: false,
    local: false,
  });

  const darkModeColorAndIcon = computed(() => {
    switch (darkMode.value) {
      case false:
        return { color: 'orange', icon: 'light_mode' };
      case 'auto':
        return { color: 'teal', icon: 'hdr_auto' };
      default:
        return { color: 'yellow', icon: 'dark_mode' };
    }
  });

  const httpUrl = computed(() => getHttp(endpoint));

  const applyDarkMode = () => {
    Dark.set(darkMode.value);
    AddressbarColor.set(
      Dark.isActive ? getPaletteColor('grey-10') : getPaletteColor('grey-2')
    );
  };

  const toggleDarkMode = () => {
    const index = darkModes.indexOf(darkMode.value);
    darkMode.value = darkModes[(index + 1) % darkModes.length];
    applyDarkMode();
  };

  const applyEndpoint = async (): Promise<boolean> => {
    const { loggedIn } = storeToRefs(useUserStore());
    try {
      $axios.create(getHttp(endpoint));
      await $axios.api?.get('/');
      if (endpoint.local && !loggedIn.value) {
        useUserStore().login();
      }
      ws.connect(getWs(endpoint));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const setEndpoint = async (
    host: string,
    port: number,
    ssl: boolean,
    local: boolean
  ): Promise<boolean> => {
    endpoint.host = host;
    endpoint.port = port;
    endpoint.ssl = ssl;
    endpoint.local = local;
    return await applyEndpoint();
  };

  return {
    darkMode,
    endpoint,
    darkModeColorAndIcon,
    httpUrl,
    applyDarkMode,
    toggleDarkMode,
    applyEndpoint,
    setEndpoint,
  };
});
