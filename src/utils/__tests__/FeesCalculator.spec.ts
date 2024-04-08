import { describe, expect, test } from "vitest";
import { CalculateNormalFees } from "../FeesCalculator";

describe("FeesCalculator", () => {
  test("FeesCalculator vehiclePrice: 398, vehicleType: Common", () => {
    const val = CalculateNormalFees(398, 1);
    expect(val).toEqual({
      baseFee: 39.8,
      specialFee: 7.96,
      associationFee: 5,
      fixedStorageFee: 100,
    });
  });
  test("FeesCalculator vehiclePrice: 501, vehicleType: Common", () => {
    const val = CalculateNormalFees(501, 1);
    expect(val).toEqual({
      baseFee: 50,
      specialFee: 10.02,
      associationFee: 10,
      fixedStorageFee: 100,
    });
  });
  test("FeesCalculator vehiclePrice: 57, vehicleType: Common", () => {
    const val = CalculateNormalFees(57, 1);
    expect(val).toEqual({
      baseFee: 10,
      specialFee: 1.14,
      associationFee: 5,
      fixedStorageFee: 100,
    });
  });
  test("FeesCalculator vehiclePrice: 1 800, vehicleType: Luxury", () => {
    const val = CalculateNormalFees(1800, 2);
    expect(val).toEqual({
      baseFee: 180,
      specialFee: 72,
      associationFee: 15,
      fixedStorageFee: 100,
    });
  });
  test("FeesCalculator vehiclePrice: 1 100, vehicleType: Common", () => {
    const val = CalculateNormalFees(1100, 1);
    expect(val).toEqual({
      baseFee: 50,
      specialFee: 22,
      associationFee: 15,
      fixedStorageFee: 100,
    });
  });
  test("FeesCalculator vehiclePrice: 1 000 000, vehicleType: Luxury", () => {
    const val = CalculateNormalFees(1000000, 2);
    expect(val).toEqual({
      baseFee: 200,
      specialFee: 40000,
      associationFee: 20,
      fixedStorageFee: 100,
    });
  });
});
