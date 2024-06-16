import React from 'react';

const ModalHandlerError = React.lazy(
  () => import('./components/ModalHandlerError'),
);
const ModalHandlerErrorLogout = React.lazy(
  () => import('./components/ModalHandlerErrorLogout'),
);

import {ModalHandlerErrorState} from './components/ModalHandlerError/ModalHandlerError.d';
import {ModalHandlerErrorLogoutProps} from './components/ModalHandlerErrorLogout/ModalHandlerErrorLogout.d';

export enum MODALS {
  MODAL_HANDLER_ERROR = 'ModalHandlerError',
  MODAL_HANDLER_ERROR_LOGOUT = 'ModalHandlerErrorLogout',
}

export type ModalsProps = {
  [MODALS.MODAL_HANDLER_ERROR]: ModalHandlerErrorState;
  [MODALS.MODAL_HANDLER_ERROR_LOGOUT]: ModalHandlerErrorLogoutProps;
};

export default {
  [MODALS.MODAL_HANDLER_ERROR]: ModalHandlerError,
  [MODALS.MODAL_HANDLER_ERROR_LOGOUT]: ModalHandlerErrorLogout,
};
