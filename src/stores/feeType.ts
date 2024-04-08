import { FeeTypeService } from '@/services';
import type { FeeTypeState } from '@/types';
import { defineStore } from 'pinia';

export const useFeeTypeStore = defineStore('FeeType', {
  state: (): FeeTypeState => ({
    _feesType: [],
  }),
  getters: {
    feeType(state) {
      return state._feesType;
    },
  },
  actions: {
    async fetchVehiclesType() {
      const res = await FeeTypeService.getAll();
      this._feesType = res.data.response;
    },
  },
});
