import {createReducer} from '@reduxjs/toolkit';
import {openModal, closeModal} from './actions';

interface ModalState<T = any> {
  visible: boolean;
  props: T;
}

interface ModalsState {
  [key: string]: ModalState<any>;
}

const initialState: ModalsState = {};

const modalsReducer = createReducer(initialState, builder => {
  builder
    .addCase(openModal, (state, action) => {
      const {modalType, modalProps} = action.payload;
      state[modalType] = {
        visible: true,
        props: modalProps,
      };
    })
    .addCase(closeModal, (state, action) => {
      const {modal} = action.payload;
      if (state[modal]) {
        state[modal].visible = false;
        state[modal].props = {};
      }
    });
});

export default modalsReducer;
