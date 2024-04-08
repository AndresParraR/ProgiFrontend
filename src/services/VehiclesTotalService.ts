import type { CreateVehicleTotalParams } from '@/types';
import Api from './api';

export class VehicleTotalService {
  static getAll() {
    return Api.get('/VehicleTotal');
  }

  static create(params: CreateVehicleTotalParams) {
    return Api.post('/VehicleTotal', params);
  }

  static update(id: number, params: CreateVehicleTotalParams) {
    return Api.put(`/VehicleTotal/${id}`, params);
  }

  static delete(id: number) {
    return Api.delete(`/VehicleTotal/${id}`);
  }
}
