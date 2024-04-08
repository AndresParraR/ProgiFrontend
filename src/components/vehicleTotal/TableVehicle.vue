<script setup lang="ts">
import { useAppStore, useVehiclesTotalStore } from '@/stores';
import type { VehicleTotal } from '@/types';
import { useQuasar, type QTableProps } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { formatCurrency } from '@/utils';

//Components
import { SkeletonTable } from '@/components';

const $q = useQuasar();

defineOptions({
  name: 'TableVehicle',
});

const appStore = useAppStore();
const vehiclesTotalStore = useVehiclesTotalStore();

const emit = defineEmits<{
  (e: 'editVehicle', data: VehicleTotal): void;
  (e: 'deleteVehicle', data: number): void;
}>();

const props = defineProps({
  search: { type: String, default: '' },
});

const search = computed(() => props.search);

const vehiclesTotal = computed(() => vehiclesTotalStore.vehiclesTotal);

const loadingSkeleton = ref(false);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const columns: QTableProps['columns'] = ref([
  {
    name: 'vehiclePrice',
    required: true,
    label: 'Vehicle Price ($)',
    align: 'left',
    field: (row: VehicleTotal) => formatCurrency(row.vehiclePrice),
    sortable: false,
  },
  {
    name: 'VehicleTypeName',
    required: true,
    label: 'Vehicle Type',
    align: 'center',
    field: (row: VehicleTotal) => row.vehicleTypeName,
    sortable: false,
  },
  {
    name: 'basicFee',
    align: 'center',
    label: 'Basic Fee ($)',
    field: (row: VehicleTotal) => formatCurrency(row.basicFee),
    sortable: false,
  },
  {
    name: 'specialFee',
    align: 'center',
    label: 'Special Fee ($)',
    field: (row: VehicleTotal) => formatCurrency(row.specialFee),
    sortable: false,
  },
  {
    name: 'storageFee',
    align: 'center',
    label: 'Storage Fee ($)',
    field: (row: VehicleTotal) => formatCurrency(row.storageFee),
    sortable: false,
  },
  {
    name: 'total',
    align: 'center',
    label: 'Total ($)',
    field: (row: VehicleTotal) => formatCurrency(row.total),
    sortable: false,
  },
  { name: 'actions', align: 'center', label: 'Actions' },
]);

const handleDeleteVehicle = (val: VehicleTotal) => {
  $q.dialog({
    title: 'Confirm delete',
    message: 'Would you like to delete this vehicle?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    emit('deleteVehicle', val.id);
  });
};

onMounted(async () => {
  try {
    loadingSkeleton.value = true;
    await vehiclesTotalStore.fetchVehiclesTotal();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, 'negative');
  } finally {
    loadingSkeleton.value = false;
  }
});
</script>

<template>
  <q-card>
    <q-table
      table-header-class="bg-primary text-white"
      separator="cell"
      :filter="search"
      :rows="vehiclesTotal"
      :columns="columns"
      row-key="id"
      v-if="!loadingSkeleton"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="edit"
            flat
            round
            color="primary"
            @click="emit('editVehicle', props.row)"
          />
          <q-btn
            icon="delete"
            flat
            round
            color="primary"
            @click="handleDeleteVehicle(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <SkeletonTable v-else />
  </q-card>
</template>
