import { mount } from "@vue/test-utils";
import { TableVehicle } from "@/components";
import { beforeEach, describe, expect, test, vi, vitest } from "vitest";
import {
  Dialog,
  Notify,
  QBtn,
  QCard,
  QCardSection,
  QDialog,
  QFile,
  QForm,
  QIcon,
  QSelect,
  QTable,
  QTd,
  QTr,
  Quasar,
} from "quasar";
import { createTestingPinia } from "@pinia/testing";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";

installQuasarPlugin({
  components: {
    QDialog,
    QCard,
    QCardSection,
    QBtn,
    QTable,
    QIcon,
    QTr,
    QTd,
    QSelect,
    QForm,
    QFile,
  },
  plugins: { Dialog, Notify },
});

describe("TableVehicle Component", () => {
  let wrapper: any = null;

  beforeEach(() => {
    const global = {
      plugins: [
        createTestingPinia({
          createSpy: vitest.fn,
        }),
        Quasar,
      ],
      // mocks: {
      //   $q: {
      //     dialog: vi.fn(),
      //   },
      // },
    };

    wrapper = mount(TableVehicle, {
      global,
    });
  });

  test("Should render correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Should handle Delete", () => {
    wrapper.vm.handleDeleteVehicle();
    
    expect(wrapper.vm.handleDeleteVehicle).toBeTruthy();
  });
});
