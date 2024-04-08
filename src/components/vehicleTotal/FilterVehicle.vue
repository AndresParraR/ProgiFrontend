<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'searchUpdated', val: string): void;
  (e: 'addVehicle'): void;
}>();

const search = ref('');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSearch = (val: any) => {
  emit('searchUpdated', val);
};
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="col-xs-12 row q-col-gutter-md">
        <q-space></q-space>
        <div class="col-xs-12 col-sm-4 col-md-1">
          <q-btn
            @click="emit('addVehicle')"
            push
            color="primary"
            round
            icon="add"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6">
          <q-input
            class="filter-outlined"
            v-model="search"
            debounce="500"
            @update:model-value="updateSearch"
            rounded
            outlined
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
