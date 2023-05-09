<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();
const i18n = (relativePath) => {
  return t('components.EndpointDialog.ToggleSection.' + relativePath);
};

const backendModes = [
  { label: i18n('labels.multiple'), value: 'multiple' },
  { label: i18n('labels.single'), value: 'single' },
] as const;

const emit = defineEmits(['update:mode', 'update:ssl']);

export interface Props {
  mode: 'multiple' | 'single';
  ssl: boolean;
}
const props = defineProps<Props>();

const backendMode = computed({
  get: () => props.mode,
  set: (value) => emit('update:mode', value),
});
const useSSl = computed({
  get: () => props.ssl,
  set: (value) => emit('update:ssl', value),
});

const updateBackendMode = (value) => {
  backendMode.value = value;
  useSSl.value = value === 'multiple';
};
</script>

<template>
  <q-card-section>
    <div class="row items-baseline justify-between">
      <div class="text-subtitle2 q-px-xs" style="white-space: pre">
        {{ i18n('labels.backendMode') }}
      </div>
      <q-btn-toggle
        :model-value="backendMode"
        :options="backendModes"
        no-caps
        toggle-color="primary"
        unelevated
        @update:model-value="updateBackendMode"
      />
    </div>
    <div class="row items-center justify-start">
      <div class="text-subtitle2 q-px-xs" style="white-space: pre">
        {{ i18n('labels.useSSL') }}
      </div>
      <q-toggle
        v-model="useSSl"
        :disable="backendMode === 'multiple'"
        left-label
      />
    </div>
  </q-card-section>
</template>

<style scoped></style>
