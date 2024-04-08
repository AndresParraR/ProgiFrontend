import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test } from "vitest";
import { Quasar } from "quasar";
import MainLayout from "../MainLayout.vue";

describe("MainLayout Component", () => {
  let wrapper: any = null;

  beforeEach(() => {
    const global = {
      plugins: [Quasar],
    };

    wrapper = mount(MainLayout, {
      global,
    });
  });

  test("Should render correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
