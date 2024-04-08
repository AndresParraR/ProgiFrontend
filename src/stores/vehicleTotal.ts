import { VehicleTotalService } from "@/services";
import type { CreateVehicleTotalParams, VehicleTotalState } from "@/types";
import { defineStore } from "pinia";

export const useVehiclesTotalStore = defineStore("vehiclesTotal", {
  state: (): VehicleTotalState => ({
    _vehiclesTotals: [],
  }),
  getters: {
    vehiclesTotal(state) {
      return state._vehiclesTotals;
    },
  },
  actions: {
    async fetchVehiclesTotal() {
      const res = await VehicleTotalService.getAll();
      this._vehiclesTotals = res.data.response;
    },
    async createVehiclesTotal(params: CreateVehicleTotalParams) {
      const res = await VehicleTotalService.create(params);
      this._vehiclesTotals.push(res.data.response);
    },
    async updateVehicleTotal(id: number, params: CreateVehicleTotalParams) {
      const res = await VehicleTotalService.update(id, params);
      this._vehiclesTotals[
        this._vehiclesTotals.findIndex((el) => el.id == id)
      ] = res.data.response;
    },
    async deleteVehicleTotal(id: number) {
      const res = await VehicleTotalService.delete(id);
      if (res)
        this._vehiclesTotals = this._vehiclesTotals.filter((el) => el.id != id);
    },
  },
});
