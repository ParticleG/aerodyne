<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

export interface Props {
  modelValue?: string;
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  loading: false,
});

const sms = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const smsInput = reactive({
  content: sms,
  error: computed(() => {
    if (!smsInput.content) {
      return false;
    }
    return smsInput.content.length !== 6;
  }),
  loading: false,
});

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.SmsInput.' + relativePath);
};
</script>

<template>
  <q-input
    v-model="smsInput.content"
    :dense="!$q.screen.gt.sm"
    :error="smsInput.error"
    :label="i18n('labels.smsCode')"
    :loading="smsInput.loading"
    :maxlength="6"
    clearable
    outlined
    type="number"
  >
    <template v-slot:error>
      <div>
        {{ i18n('errors.smsCode') }}
      </div>
    </template>
  </q-input>
</template>

<style scoped></style>
