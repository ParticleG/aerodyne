<template>
  <q-layout view="lHh LpR lFf">
    <router-view
      name="header"
      :mobile="screen.lt.md"
      @toggle:drawer="toggleLeftDrawer"
    />
    <router-view
      name="drawer"
      @toggle:drawer="toggleLeftDrawer"
      :mobile="screen.lt.md"
      :model-value="screen.lt.md ? leftDrawerOpen : true"
    />
    <q-page-container>
      <router-view
        :class="$q.platform.is.mobile ? 'q-px-md' : 'q-pl-md'"
        @toggle:drawer="toggleLeftDrawer"
      />
    </q-page-container>
    <router-view name="footer" @toggle:drawer="toggleLeftDrawer" />
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const { screen } = useQuasar();
const leftDrawerOpen = ref(true);

function toggleLeftDrawer(action?: boolean) {
  leftDrawerOpen.value = action ?? !leftDrawerOpen.value;
}
</script>
