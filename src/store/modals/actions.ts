import {createAction} from '@reduxjs/toolkit';

export const openModal = createAction<{modalType: string; modalProps: any}>(
  'modals/open',
);
export const closeModal = createAction<{modal: string}>('modals/close');
