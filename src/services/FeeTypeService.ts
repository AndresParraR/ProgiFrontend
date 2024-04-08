import Api from './api';

export class FeeTypeService {
  static getAll() {
    return Api.get('/FeeType');
  }
}
