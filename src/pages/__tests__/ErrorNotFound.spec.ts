import { mount } from "@vue/test-utils";
import { ErrorNotFound } from "@/pages";
import { beforeEach, describe, expect, test } from "vitest";
import { Quasar } from "quasar";

describe("ErrorNotFound Component", () => {
  let wrapper: any = null;

  beforeEach(() => {
    const global = {
      plugins: [Quasar],
    };

    wrapper = mount(ErrorNotFound, {
      global,
    });
  });

  test("Should render correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
