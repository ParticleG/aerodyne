<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <div
      class="text-grey self-center"
      style="font-style: italic; font-size: 1.5rem"
    >
      {{ i18n('labels.noAccounts') }}
    </div>
    <div class="row q-gutter-x-md justify-end">
      <q-btn
        flat
        :color="$q.dark.isActive ? 'white' : 'black'"
        :label="i18n('labels.ok')"
        @click="emit('click:cancel')"
      />
    </div>
  </q-tab-panel>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.AccountDialog.AccountPanel.' + relativePath);
};

const emit = defineEmits(['click:cancel']);
</script>

<style scoped></style>
