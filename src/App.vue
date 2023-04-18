<template>
  <router-view />
</template>

<script setup lang="ts">
import { useSettingsStore } from 'stores/settings';

useSettingsStore().applyDarkMode();
</script>
