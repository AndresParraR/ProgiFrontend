import Api from './api';

export class VehicleTypeService {
  static getAll() {
    return Api.get('/VehicleType');
  }
}
