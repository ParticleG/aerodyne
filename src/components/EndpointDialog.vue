<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar">
      <q-card-section>
        <div class="text-h6">{{ i18n('labels.title') }}</div>
      </q-card-section>
      <q-card-section>
        <div class="row items-baseline justify-between">
          <div class="text-subtitle2 q-px-xs" style="white-space: pre">
            {{ i18n('labels.backendMode') }}
          </div>
          <q-btn-toggle
            :model-value="backendMode"
            no-caps
            :options="backendModes"
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
            :disable="backendMode === 'multiple'"
            left-label
            v-model="useSSl"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-x-sm">
          <q-input
            class="col-grow"
            autofocus
            :dense="!$q.screen.gt.sm"
            :error="hostInput.error"
            :label="i18n('labels.host')"
            :loading="hostInput.loading"
            no-error-icon
            outlined
            type="url"
            v-model="hostInput.content"
          >
            <template v-slot:error>
              <div>
                {{ i18n('errors.host') }}
              </div>
            </template>
          </q-input>
          <q-input
            :dense="!$q.screen.gt.sm"
            :error="portInput.error"
            :label="i18n('labels.port')"
            :loading="portInput.loading"
            mask="#####"
            maxlength="5"
            no-error-icon
            outlined
            v-model="portInput.content"
            style="width: 80px"
          >
            <template v-slot:error>
              <div>
                {{ i18n('errors.port') }}
              </div>
            </template>
          </q-input>
        </div>
        <div class="text-grey q-px-xs" style="white-space: pre">
          {{ i18n(`descriptions.${backendMode}`) }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-x-md justify-end">
          <q-btn
            flat
            :color="$q.dark.isActive ? 'white' : 'black'"
            :label="i18n('labels.cancel')"
            @click="onDialogCancel"
          />
          <q-btn
            color="primary"
            :disabled="
              !hostInput.content ||
              !portInput.content ||
              hostInput.error ||
              portInput.error
            "
            :label="i18n('labels.connect')"
            @click="confirm"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { EXTRANET_PATTERN, INTRANET_PATTERN } from 'src/utils/constants';

import { useSettingsStore } from 'stores/settings';

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } =
  useDialogPluginComponent();

const { notify } = useQuasar();

const { t } = useI18n();
const i18n = (relativePath) => {
  return t('components.EndpointDialog.' + relativePath);
};

const { setEndpoint } = useSettingsStore();

const backendModes = [
  { label: i18n('labels.multiple'), value: 'multiple' },
  { label: i18n('labels.single'), value: 'single' },
];

const backendMode = ref(backendModes[0].value);

const useSSl = ref(true);

const hostInput = reactive({
  content: '',
  error: computed(() => {
    if (!hostInput.content) {
      return false;
    }
    const isIntranet = INTRANET_PATTERN.test(hostInput.content);
    if (backendMode.value === 'single') {
      return !isIntranet;
    } else {
      return isIntranet || !EXTRANET_PATTERN.test(hostInput.content);
    }
  }),
  loading: false,
});

const portInput = reactive({
  content: '3000',
  error: computed(() => {
    if (!portInput.content) {
      return false;
    }
    return portInput.content < 0 || portInput.content > 65535;
  }),
  loading: false,
});

const updateBackendMode = (value: string) => {
  backendMode.value = value;
  if (value === 'multiple') {
    useSSl.value = true;
  }
};

const confirm = async () => {
  hostInput.loading = true;
  portInput.loading = true;
  const success = await setEndpoint(
    hostInput.content,
    Number(portInput.content),
    useSSl.value
  );
  if (success) {
    notify({
      type: 'positive',
      message: i18n('notifications.connectSuccess'),
    });
    onDialogOK(backendMode.value);
  } else {
    notify({
      type: 'negative',
      message: i18n('notifications.connectFailed'),
    });
  }
  hostInput.loading = false;
  portInput.loading = false;
};
</script>

<style scoped lang="scss">
@import 'src/css/app';

.q-btn-group {
  border: 1px solid $primary;
}
</style>
