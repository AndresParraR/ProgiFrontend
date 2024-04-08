export interface VehicleTotalState {
  _vehiclesTotals: VehicleTotal[];
}

export interface CreateVehicleTotalParams {
  vehiclePrice: number;
  vehicleTypeId: number;
}

export interface VehicleTotal {
  id: number;
  vehiclePrice: number;
  vehicleTypeId: number;
  vehicleTypeName: string;
  basicFee: number;
  specialFee: number;
  associationFee: number;
  storageFee: number;
  total: number;
}
