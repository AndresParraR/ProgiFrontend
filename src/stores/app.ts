import { NotifyPosition } from "@/enums";
import type { AppState } from "@/types";
import { defineStore } from "pinia";
import type { QNotifyCreateOptions } from "quasar";

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    _notify: {
      message: "",
      type: "",
      timeout: 0,
      position: NotifyPosition.TOP_RIGHT,
    },
    _isLoading: false,
  }),
  getters: {
    notify(state) {
      return state._notify;
    },
    isLoading(state) {
      return state._isLoading;
    },
  },
  actions: {
    showNotification(
      message: string,
      type: string,
      timeout: number = 4000,
      position: QNotifyCreateOptions["position"] = NotifyPosition.TOP_RIGHT
    ) {
      this._notify = {
        message,
        type,
        timeout,
        position,
      };
    },
    setLoading(val: boolean) {
      this._isLoading = val;
    },
  },
});
