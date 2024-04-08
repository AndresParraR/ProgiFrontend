import { mount } from "@vue/test-utils";
import { DialogVehicle } from "@/components";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { useVehicleTypeStore } from "@/stores";
import { Quasar } from "quasar";

describe("DialogVehicle Component", () => {
  let wrapper: any = null;

  beforeEach(() => {
    const props = {
      showDialog: true,
      vehicle: {
        vehiclePrice: 200,
        vehicleTypeId: 1,
      },
    };

    const global = {
      plugins: [
        createTestingPinia({
          createSpy: vitest.fn,
        }),
        Quasar,
      ],
    };

    wrapper = mount(DialogVehicle, {
      props,
      global,
    });
  });

  test("Should render correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Should computed vehicleTypes", () => {
    const vehicleTypeStore = useVehicleTypeStore();

    vehicleTypeStore._vehiclesType = [
      {
        id: 1,
        name: "Common",
      },
    ];

    expect(wrapper.vm.vehicleTypes).toEqual([
      {
        label: "Common",
        value: 1,
      },
    ]);
  });

  test("Should computed feesValues", () => {
    wrapper.vm.vehicleTypeId = 1;
    wrapper.vm.vehiclePrice = 398;

    expect(wrapper.vm.feesValues).toEqual({
      baseFee: 39.8,
      specialFee: 7.96,
      associationFee: 5,
      fixedStorageFee: 100,
    });
  });

  test("Should watch for vehicle prop", async () => {
    await wrapper.setProps({
      vehicle: { vehiclePrice: 501, vehicleTypeId: 1 },
    });

    expect(wrapper.vm.vehiclePrice).toEqual(501);
    expect(wrapper.vm.vehicleTypeId).toEqual(1);
  });

  test("Should watch for vehicle prop null", async () => {
    wrapper.vm.vehiclePrice = 57;
    wrapper.vm.vehicleTypeId = 1;

    await wrapper.setProps({
      vehicle: undefined,
    });

    expect(wrapper.vm.cleanForm).toBeTruthy();
    expect(wrapper.vm.vehiclePrice).toEqual(null);
    expect(wrapper.vm.vehicleTypeId).toEqual(null);
  });

  test("Should onSubmit emit vehicleEdited", async () => {
    await wrapper.setProps({
      vehicle: { vehiclePrice: 501, vehicleTypeId: 1 },
    });

    wrapper.vm.onSubmit();

    expect(wrapper.emitted().vehicleEdited).toBeTruthy();
    expect(wrapper.emitted().close).toBeTruthy();
  });

  test("Should onSubmit emit vehicleAdded", async () => {
    await wrapper.setProps({
      vehicle: undefined,
    });

    wrapper.vm.onSubmit();

    expect(wrapper.emitted().vehicleAdded).toBeTruthy();
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
