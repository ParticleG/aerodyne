<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

export interface Props {
  modelValue: string;
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const account = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const accountInput = reactive({
  content: account,
  error: computed(() => {
    if (!accountInput.content) {
      return false;
    }
    return accountInput.content.length < 5;
  }),
  loading: false,
});

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.AccountInput.' + relativePath);
};
</script>

<template>
  <q-input
    v-model="accountInput.content"
    :dense="!$q.screen.gt.sm"
    :error="accountInput.error"
    :label="i18n('labels.account')"
    :loading="accountInput.loading"
    :maxlength="12"
    clearable
    outlined
    type="number"
  >
    <template v-slot:error>
      <div>
        {{ i18n('errors.account') }}
      </div>
    </template>
  </q-input>
</template>

<style scoped></style>
