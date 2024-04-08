import type { QNotifyCreateOptions } from 'quasar';

export interface AppState {
  _notify: {
    message: string;
    type: string;
    timeout: number;
    position: QNotifyCreateOptions['position'];
  };
  _isLoading: boolean;
}
