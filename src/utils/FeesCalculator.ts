import { VehicleTypesEnum } from '@/enums';

export const CalculateNormalFees = (
  vehiclePrice: number,
  vehicleTypeId: number,
) => {
  let baseFee = (vehiclePrice * 10) / 100;
  let specialFee = 0;
  let associationFee = 0;
  const fixedStorageFee = 100;

  if (vehicleTypeId == VehicleTypesEnum.COMMON) {
    baseFee = baseFee < 10 ? 10 : baseFee > 50 ? 50 : baseFee;
    specialFee = (vehiclePrice * 2) / 100;
  } else if (vehicleTypeId == VehicleTypesEnum.LUXURY) {
    baseFee = baseFee < 25 ? 25 : baseFee > 200 ? 200 : baseFee;
    specialFee = (vehiclePrice * 4) / 100;
  }

  switch (true) {
    case vehiclePrice >= 1 && vehiclePrice <= 500:
      associationFee = 5;
      break;
    case vehiclePrice > 500 && vehiclePrice <= 1000:
      associationFee = 10;
      break;
    case vehiclePrice >= 1000 && vehiclePrice <= 3000:
      associationFee = 15;
      break;
    case vehiclePrice >= 300:
      associationFee = 20;
      break;
  }

  return { baseFee, specialFee, associationFee, fixedStorageFee };
};
