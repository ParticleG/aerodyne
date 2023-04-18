<template>
  <q-layout view="lHh LpR lFf" @resize="onResize">
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
        class="scrollbar-page"
        :class="screen.lt.md ? 'q-px-md' : 'q-pl-md'"
        @toggle:drawer="toggleLeftDrawer"
        :style="{ height: `${pageHeight}px` }"
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

const pageHeight = ref(0);

const onResize = ({ height }) => {
  pageHeight.value = height - 122;
};
const toggleLeftDrawer = (action?: boolean) => {
  leftDrawerOpen.value = action ?? !leftDrawerOpen.value;
};
</script>
