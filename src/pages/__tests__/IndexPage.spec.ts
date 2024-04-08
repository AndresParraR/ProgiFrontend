import { mount } from "@vue/test-utils";
import { IndexPage } from "@/pages";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { Quasar } from "quasar";
import { createTestingPinia } from "@pinia/testing";
import { useVehiclesTotalStore } from "@/stores";

describe("IndexPage Component", () => {
  let wrapper: any = null;

  beforeEach(() => {
    const global = {
      plugins: [
        createTestingPinia({
          createSpy: vitest.fn,
        }),
        Quasar,
      ],
    };

    wrapper = mount(IndexPage, {
      global,
    });
  });

  test("Should render correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("should handleSearch change search value", async () => {
    const val = "text";

    wrapper.vm.handleSearch(val);

    expect(wrapper.vm.search).toEqual(val);
  });

  test("should handleEditVehicleTotal change vehicle value", async () => {
    const val = {
      id: 1,
      vehiclePrice: 501,
      vehicleTypeId: 1,
      vehicleTypeName: "Common",
      basicFee: 50,
      specialFee: 10.02,
      associationFee: 10,
      storageFee: 100,
      total: 671.02,
    };

    wrapper.vm.handleEditVehicleTotal(val);

    expect(wrapper.vm.vehicleTotal).toEqual(val);
    expect(wrapper.vm.showDialogVehicle).toEqual(true);
  });

  test("should handleAddVehicle change showDialogVehicle value", async () => {
    wrapper.vm.handleAddVehicle();

    expect(wrapper.vm.showDialogVehicle).toEqual(true);
  });

  test("should addVehicle", async () => {
    const vehiclesTotalStore = useVehiclesTotalStore();

    wrapper.vm.vehicleTotal = {
      id: 1,
      vehiclePrice: 501,
      vehicleTypeId: 1,
      vehicleTypeName: "Common",
      basicFee: 50,
      specialFee: 10.02,
      associationFee: 10,
      storageFee: 100,
      total: 671.02,
    };

    wrapper.vm.showDialogVehicle = true;

    await wrapper.vm.addVehicle();

    expect(vehiclesTotalStore.createVehiclesTotal).toBeCalled();
    expect(wrapper.vm.vehicleTotal).toEqual(null);
    expect(wrapper.vm.showDialogVehicle).toEqual(false);
  });

  test("should editVehicle", async () => {
    const vehiclesTotalStore = useVehiclesTotalStore();

    wrapper.vm.vehicleTotal = {
      id: 1,
      vehiclePrice: 501,
      vehicleTypeId: 1,
      vehicleTypeName: "Common",
      basicFee: 50,
      specialFee: 10.02,
      associationFee: 10,
      storageFee: 100,
      total: 671.02,
    };

    wrapper.vm.showDialogVehicle = true;

    await wrapper.vm.editVehicle();

    expect(vehiclesTotalStore.updateVehicleTotal).toBeCalled();
    expect(wrapper.vm.vehicleTotal).toEqual(null);
    expect(wrapper.vm.showDialogVehicle).toEqual(false);
  });

  test("should deleteVehicle", async () => {
    const vehiclesTotalStore = useVehiclesTotalStore();

    await wrapper.vm.deleteVehicle();

    expect(vehiclesTotalStore.deleteVehicleTotal).toBeCalled();
  });
});
