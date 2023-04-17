<template>
  <q-footer class="footer">
    <q-toolbar class="row justify-center q-py-sm">
      <q-input
        class="col-12 col-lg-10 col-xl-8"
        autogrow
        bg-color="dark"
        debounce="250"
        v-model="inputMessage"
        borderless
      >
        <template v-slot:prepend>
          <q-icon class="q-ml-md" name="search" />
        </template>
        <template v-slot:after>
          <q-btn color="dark" fab icon="send" round />
        </template>
      </q-input>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputMessage = ref('');
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";
.footer {
  background-color: $dark-page;
}
</style>
