<template>
  <q-footer>
    <q-toolbar class="row justify-center q-py-sm">
      <div class="row col-grow col-lg-10 col-xl-8 q-gutter-sm">
        <q-input
          class="color-auto col-grow"
          autogrow
          debounce="250"
          v-model="inputMessage"
          borderless
          style="border-radius: 9999px"
        >
          <template v-slot:prepend>
            <q-icon class="q-ml-md" name="search" />
          </template>
        </q-input>
        <q-btn class="color-auto" fab icon="send" round unelevated />
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputMessage = ref('');
</script>

<style scoped lang="scss">
@import 'css/app';

body.body--dark {
  .q-footer {
    background-color: $dark-page;
  }
}

body.body--light {
  .q-footer {
    background-color: $light-page;
  }
}
</style>
