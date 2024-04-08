import { VehicleTypeService } from '@/services';
import type { VehicleTypeState } from '@/types';
import { defineStore } from 'pinia';

export const useVehicleTypeStore = defineStore('vehicleType', {
  state: (): VehicleTypeState => ({
    _vehiclesType: [],
  }),
  getters: {
    vehicleType(state) {
      return state._vehiclesType;
    },
  },
  actions: {
    async fetchVehiclesType() {
      const res = await VehicleTypeService.getAll();
      this._vehiclesType = res.data.response;
    },
  },
});
