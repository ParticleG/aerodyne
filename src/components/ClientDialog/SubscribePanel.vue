<template>
  <q-tab-panel class="column q-gutter-y-lg">
    <q-input
      v-model="accountInput.content"
      clearable
      :dense="!$q.screen.gt.sm"
      :error="accountInput.error"
      :label="i18n('labels.account')"
      :loading="accountInput.loading"
      :maxlength="12"
      outlined
      type="number"
    >
      <template v-slot:error>
        <div>
          {{ i18n('errors.account') }}
        </div>
      </template>
    </q-input>
    <div class="row q-gutter-x-md justify-end">
      <q-btn
        flat
        :color="$q.dark.isActive ? 'white' : 'black'"
        :label="i18n('labels.cancel')"
        @click="emit('click:cancel')"
      />
      <q-btn
        color="primary"
        :label="i18n('labels.subscribe')"
        @click="emit('click:confirm')"
      />
    </div>
  </q-tab-panel>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.ClientDialog.SubscribePanel.' + relativePath);
};

const emit = defineEmits(['click:cancel', 'click:confirm']);

const accountInput = reactive({
  content: '',
  error: computed(() => {
    if (!accountInput.content) {
      return false;
    }
    return accountInput.content.length < 5;
  }),
  loading: false,
});
</script>

<style scoped></style>
