<script setup lang="ts">
import { computed, watch } from "vue";
import { useAppStore } from "@/stores";
import { useQuasar } from "quasar";

defineOptions({
  name: "App",
});

const $q = useQuasar();

const appStore = useAppStore();

const notify = computed(() => appStore.notify);
const isLoading = computed(() => appStore.isLoading);

watch(isLoading, (newValue) => {
  if (newValue) {
    $q.loading.show({
      message: "Important process in progress. Hang on a minute...",
    });
  } else {
    $q.loading.hide();
  }
});

watch(notify, (newValue) => {
  if (newValue) {
    $q.notify({
      message: newValue.message,
      type: newValue.type,
      timeout: newValue.timeout,
      position: newValue.position,
      group: true,
      html: true,
    });
  }
});
</script>

<template>
  <title>Progi Car</title>
  <router-view />
</template>
