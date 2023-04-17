<template>
  <q-footer>
    <q-toolbar class="row justify-center q-gutter-sm q-py-sm">
      <q-input
        class="color-auto col-12 col-lg-10 col-xl-8"
        autogrow
        debounce="250"
        v-model="inputMessage"
        borderless
        style="border-radius: 9999px;"
      >
        <template v-slot:prepend>
          <q-icon class="q-ml-md" name="search" />
        </template>
      </q-input>
      <q-btn class="color-auto" fab icon="send" round unelevated />
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputMessage = ref('');
</script>

<style scoped lang="scss"></style>
