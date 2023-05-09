<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUsersStore } from 'stores/users';
import OnlineIndicator from 'components/ProfileButton/OnlineIndicator.vue';

const { t } = useI18n();
const { currentUser } = storeToRefs(useUsersStore());

const emit = defineEmits(['update:modelValue']);

export interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();

const isShown = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const i18n = (relativePath) => {
  return t('components.ProfileButton.ProfileMenu.' + relativePath);
};

const goProfile = () => {
  console.log(currentUser.value);
};

const switchAccount = () => {
  console.log('switchAccount');
};
</script>

<template>
  <q-menu
    v-if="currentUser"
    :offset="[15, 0]"
    anchor="center right"
    no-parent-event
    self="center left"
    style="border-radius: 0.75rem; min-width: 11rem"
    v-model="isShown"
  >
    <div class="relative-position q-pa-md">
      <div
        class="absolute-top bg-primary row justify-end items-start"
        style="height: 50%"
      >
        <q-btn
          round
          size="sm"
          class="q-ma-sm"
          icon="edit"
          unelevated
          style="background-color: rgba(0, 0, 0, 0.2)"
          @click="switchAccount"
        />
      </div>
      <q-btn
        :color="$q.dark.isActive ? 'dark' : 'white'"
        round
        size="xl"
        unelevated
        @click="goProfile"
      >
        <q-avatar
          :icon="currentUser.avatar ? undefined : 'account_circle'"
          size="64px"
          :text-color="$q.dark.isActive ? 'white' : 'dark'"
        >
          <q-img v-if="currentUser.avatar" :src="currentUser.avatar" />
        </q-avatar>
        <online-indicator />
      </q-btn>
    </div>
    <div class="q-px-md q-pb-md">
      <q-card bordered flat class="q-px-sm">
        <q-list>
          <q-item>
            <q-item-section class="text-h6">
              {{ currentUser.username }}
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable @click="goProfile">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>
              {{ i18n('labels.accountSettings') }}
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>
          <q-item clickable @click="switchAccount">
            <q-item-section avatar>
              <q-icon name="shuffle" />
            </q-item-section>
            <q-item-section>
              {{ i18n('labels.switchAccount') }}
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </q-menu>
</template>

<style scoped></style>
