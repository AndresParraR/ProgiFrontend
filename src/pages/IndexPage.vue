<script setup lang="ts">
import { ref, type Ref } from 'vue';
//Components
import { FilterVehicle, TableVehicle, DialogVehicle } from '@/components';
import type { CreateVehicleTotalParams, VehicleTotal } from '@/types';
import { useAppStore, useVehiclesTotalStore } from '@/stores';

defineOptions({
  name: 'IndexPage',
});

const appStore = useAppStore();
const vehiclesTotalStore = useVehiclesTotalStore();

const search: Ref<string> = ref('');
const showDialogVehicle: Ref<boolean> = ref(false);
const vehicleTotal: Ref<VehicleTotal | null> = ref(null);

const handleSearch = (val: string) => {
  search.value = val;
};

const handleEditVehicleTotal = (val: VehicleTotal | null) => {
  vehicleTotal.value = val;
  showDialogVehicle.value = true;
};

const handleAddVehicle = () => {
  showDialogVehicle.value = true;
};

const addVehicle = async (val: CreateVehicleTotalParams) => {
  try {
    appStore.setLoading(true);
    await vehiclesTotalStore.createVehiclesTotal(val);
    appStore.showNotification('Vehicle succesfully created!', 'positive');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, 'negative');
  } finally {
    appStore.setLoading(false);
    closeDialogVehicle();
  }
};

const editVehicle = async (val: CreateVehicleTotalParams) => {
  try {
    appStore.setLoading(true);
    await vehiclesTotalStore.updateVehicleTotal(
      vehicleTotal.value?.id as number,
      val,
    );
    appStore.showNotification('Vehicle succesfully edited!', 'positive');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, 'negative');
  } finally {
    appStore.setLoading(false);
    closeDialogVehicle();
  }
};

const deleteVehicle = async (val: number) => {
  try {
    appStore.setLoading(true);
    await vehiclesTotalStore.deleteVehicleTotal(val);
    appStore.showNotification('Vehicle succesfully deleted!', 'positive');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, 'negative');
  } finally {
    appStore.setLoading(false);
  }
};

const closeDialogVehicle = () => {
  vehicleTotal.value = null;
  showDialogVehicle.value = false;
};
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-card style="min-width: 900px">
      <DialogVehicle
        :show-dialog="showDialogVehicle"
        :vehicle="vehicleTotal!"
        @vehicle-added="($event: any) => addVehicle($event)"
        @vehicle-edited="($event: any) => editVehicle($event)"
        @close="closeDialogVehicle"
      />
      <FilterVehicle
        @search-updated="($event) => handleSearch($event)"
        @add-vehicle="() => handleAddVehicle()"
      />
      <TableVehicle
        :search="search"
        @edit-vehicle="handleEditVehicleTotal"
        @delete-vehicle="deleteVehicle"
      />
    </q-card>
  </q-page>
</template>
