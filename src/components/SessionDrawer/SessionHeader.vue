<template>
  <q-toolbar class="row justify-center q-pa-sm q-pt-xs">
    <q-input
      v-show="!mini"
      ref="searchInput"
      class="col-grow"
      clearable
      dense
      outlined
      rounded
      v-model.trim="searchText"
      @keydown.enter.prevent="onEnter"
    >
      <template v-slot:prepend>
        <q-icon color="grey" name="search" />
      </template>
    </q-input>
    <q-btn
      v-show="mini"
      icon="search"
      color="grey"
      outline
      round
      size="13px"
      unelevated
    >
      <q-menu
        anchor="bottom start"
        cover
        :offset="[0, 10]"
        style="box-shadow: none; border-radius: 9999px"
      >
        <q-input
          ref="searchInput"
          class="col-grow"
          clearable
          dense
          autofocus
          outlined
          rounded
          v-model="searchText"
          @keydown.enter.prevent="onEnter"
        />
      </q-menu>
    </q-btn>
  </q-toolbar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QInput } from 'quasar';

export interface Props {
  modelValue: string;
  mini?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});

const emit = defineEmits(['keydown.enter', 'update:modelValue']);
const searchText = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const searchInput = ref(null);

const onEnter = () => {
  (searchInput.value as QInput).blur();
  emit('keydown.enter');
};
</script>

<style scoped></style>
