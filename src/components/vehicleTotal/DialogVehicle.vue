<script lang="ts" setup>
//Components
import { useAppStore, useVehicleTypeStore } from "@/stores";
import type { CreateVehicleTotalParams, VehicleType } from "@/types";
import {
  CalculateNormalFees,
  isRequired,
  numbersValidation,
  maxLength,
  formatCurrency,
} from "@/utils";

import { computed, ref, watch, type Ref, type PropType, onMounted } from "vue";

const vehicleTypeStore = useVehicleTypeStore();
const appStore = useAppStore();

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: "vehicleAdded", data: CreateVehicleTotalParams): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: "vehicleEdited", data: CreateVehicleTotalParams): void;
  (e: "close"): void;
}>();

const props = defineProps({
  showDialog: { type: Boolean, default: false },
  vehicle: { type: Object as PropType<CreateVehicleTotalParams> },
});

const dialog = computed(() => props.showDialog);

const vehicleTypes = computed(() =>
  vehicleTypeStore.vehicleType.map((el: VehicleType) => ({
    label: el.name,
    value: el.id,
  }))
);

const feesValues = computed(() => {
  return CalculateNormalFees(
    vehiclePrice.value as number,
    vehicleTypeId.value as number
  );
});

const vehiclePrice: Ref<number | null> = ref(null);
const vehicleTypeId: Ref<number | null> = ref(null);

watch(props, (newValue) => {
  if (newValue.vehicle) {
    vehiclePrice.value = newValue.vehicle.vehiclePrice;
    vehicleTypeId.value = newValue.vehicle.vehicleTypeId;
  } else {
    cleanForm();
  }
});

const onSubmit = () => {
  if (props.vehicle) {
    emit("vehicleEdited", {
      vehiclePrice: vehiclePrice.value!,
      vehicleTypeId: vehicleTypeId.value!,
    });
  } else {
    emit("vehicleAdded", {
      vehiclePrice: vehiclePrice.value!,
      vehicleTypeId: vehicleTypeId.value!,
    });
  }

  Close();
};

const cleanForm = () => {
  vehiclePrice.value = null;
  vehicleTypeId.value = null;
};

const Close = () => {
  cleanForm();
  emit("close");
};

onMounted(async () => {
  try {
    appStore.setLoading(true);
    await vehicleTypeStore.fetchVehiclesType();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appStore.showNotification((error as any).message, "negative");
  } finally {
    appStore.setLoading(false);
  }
});
</script>

<template>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-form @submit="onSubmit" style="padding: 2em 3em" class="q-gutter-md">
        <q-card-section class="row items-center">
          <div class="row q-col-gutter-md col-xs-12">
            <div class="row col-xs-6" style="row-gap: 20px">
              <div class="col-sm-12">
                <q-input
                  outlined
                  rounded
                  clearable
                  type="number"
                  maxlength="10"
                  v-model="vehiclePrice"
                  label="Vehicle Price *"
                  lazy-rules
                  :rules="[isRequired, numbersValidation, maxLength]"
                />
              </div>
              <div class="col-sm-12">
                <q-select
                  class="filter-date-outlined"
                  rounded
                  outlined
                  emit-value
                  map-options
                  v-model="vehicleTypeId"
                  :options="vehicleTypes"
                  label="Vehicle Type*"
                  :rules="[isRequired]"
                  lazy-rules
                />
              </div>
            </div>
            <div v-if="vehiclePrice && vehicleTypeId" class="col-xs-6 q-px-xl">
              <p class="text-body1">
                Basic Fee ($): {{ formatCurrency(feesValues.baseFee) }}
              </p>
              <p class="text-body1">
                Special Fee ($): {{ formatCurrency(feesValues.specialFee) }}
              </p>
              <p class="text-body1">
                Association Fee ($):
                {{ formatCurrency(feesValues.associationFee) }}
              </p>
              <p class="text-body1">
                Storage Fee ($):
                {{ formatCurrency(feesValues.fixedStorageFee) }}
              </p>
              <p class="text-body1">
                Total ($):
                {{
                  formatCurrency(
                    parseFloat(vehiclePrice.toString()) +
                      feesValues.baseFee +
                      feesValues.specialFee +
                      feesValues.associationFee +
                      feesValues.fixedStorageFee
                  )
                }}
              </p>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            style="margin-right: 3em"
            color="negative"
            label="Cerrar"
            @click="Close"
          />
          <q-btn color="positive" label="Guardar" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
