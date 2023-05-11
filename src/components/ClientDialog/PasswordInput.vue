<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
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

const password = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const passwordInput = reactive({
  content: password,
  error: computed(() => {
    if (!passwordInput.content) {
      return false;
    }
    return passwordInput.content.length < 8;
  }),
  loading: false,
});

const showPassword = ref(false);

const i18n = (relativePath: string) => {
  return t('components.ClientDialog.PasswordInput.' + relativePath);
};
</script>

<template>
  <q-input
    v-model="passwordInput.content"
    :dense="!$q.screen.gt.sm"
    :error="passwordInput.error"
    :label="i18n('labels.password')"
    :loading="passwordInput.loading"
    clearable
    outlined
    :type="showPassword ? 'text' : 'password'"
  >
    <template v-slot:append>
      <q-icon
        :name="showPassword ? 'visibility' : 'visibility_off'"
        class="cursor-pointer"
        @click="showPassword = !showPassword"
      />
    </template>
    <template v-slot:error>
      <div>
        {{ i18n('errors.password') }}
      </div>
    </template>
  </q-input>
</template>

<style scoped></style>
