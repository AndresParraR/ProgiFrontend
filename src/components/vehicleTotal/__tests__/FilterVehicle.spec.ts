import { mount } from "@vue/test-utils";
import { FilterVehicle } from "@/components";
import { beforeEach, describe, expect, test } from "vitest";
import { Quasar } from "quasar";

describe("FilterVehicle Component", () => {
  let wrapper: any = null;

  beforeEach(() => {
    const global = {
      plugins: [Quasar],
    };

    wrapper = mount(FilterVehicle, {
      global,
    });
  });

  test("Should render correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Should updateSearch emit searchUpdated", async () => {
    wrapper.vm.updateSearch("text");

    expect(wrapper.emitted().searchUpdated).toBeTruthy();
  });

  test("Should emit addVehicle", async () => {
    wrapper.vm.emit('addVehicle');

    expect(wrapper.emitted().addVehicle).toBeTruthy();
  });
});
