<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar">
      <q-card-section>
        <div class="text-h6">{{ i18n('labels.title') }}</div>
      </q-card-section>
      <toggle-section
        :mode="backendMode"
        :ssl="useSSl"
        @update:mode="backendMode = $event"
        @update:ssl="useSSl = $event"
      />
      <q-card-section>
        <div class="row q-gutter-x-sm">
          <q-input
            v-model="hostInput.content"
            :dense="!$q.screen.gt.sm"
            :error="hostInput.error"
            :label="i18n('labels.host')"
            :loading="hostInput.loading"
            autofocus
            class="col-grow"
            no-error-icon
            outlined
            type="url"
            @keydown.enter="canConfirm && confirm()"
          >
            <template v-slot:error>
              <div>
                {{ i18n('errors.host') }}
              </div>
            </template>
          </q-input>
          <q-input
            v-model="portInput.content"
            :dense="!$q.screen.gt.sm"
            :error="portInput.error"
            :label="i18n('labels.port')"
            :loading="portInput.loading"
            mask="#####"
            maxlength="5"
            no-error-icon
            outlined
            style="width: 80px"
            @keydown.enter="canConfirm && confirm()"
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
            :color="$q.dark.isActive ? 'white' : 'black'"
            :label="i18n('labels.cancel')"
            flat
            @click="onDialogCancel"
          />
          <q-btn
            :disabled="!canConfirm"
            :label="i18n('labels.connect')"
            color="primary"
            @click="confirm"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ToggleSection from 'components/EndpointDialog/ToggleSection.vue';
import { useSettingsStore } from 'stores/settings';
import { EXTRANET_PATTERN, INTRANET_PATTERN } from 'utils/constants';

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } =
  useDialogPluginComponent();
const { notify } = useQuasar();
const { t } = useI18n();
const { setEndpoint } = useSettingsStore();

const backendMode = ref('multiple' as 'multiple' | 'single');
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

const canConfirm = computed(
  () =>
    hostInput.content &&
    portInput.content &&
    !hostInput.error &&
    !portInput.error
);

const i18n = (relativePath) => {
  return t('components.EndpointDialog.' + relativePath);
};

const confirm = async () => {
  hostInput.loading = true;
  portInput.loading = true;
  const success = await setEndpoint(
    hostInput.content,
    Number(portInput.content),
    useSSl.value,
    backendMode.value === 'single'
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

<style lang="scss" scoped>
@import 'css/app';

.q-btn-group {
  border: 1px solid $primary;
}
</style>
