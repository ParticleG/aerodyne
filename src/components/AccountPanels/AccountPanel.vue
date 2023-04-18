<template>
  <q-tab-panel class="column q-gutter-y-lg" style="margin-bottom: 2.25rem">
    <div
      class="text-grey self-center"
      style="font-style: italic; font-size: 1.5rem"
    >
      {{ i18n('labels.noAccounts') }}
    </div>
  </q-tab-panel>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.AccountPanels.AccountPanel.' + relativePath);
};
</script>

<style scoped></style>
