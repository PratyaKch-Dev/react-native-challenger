import React, {Suspense, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'store';
import Modals, {MODALS, ModalsProps} from './Modals';
import {openModal, closeModal} from 'store/modals/actions';

export interface ModalBaseProps {
  visible: boolean;
  onClose: () => void;
}

interface ModalState<T = any> {
  visible: boolean;
  props: T;
}

interface ModalsState {
  [key: string]: ModalState<any>;
}

export function useModals() {
  const dispatch = useDispatch();
  const modalsState = useSelector(
    (state: RootState) => state.modals,
  ) as ModalsState;

  const getModalOpen = useCallback(
    (modal: MODALS): ModalState<any> => {
      return modalsState[modal] || {visible: false, props: {}};
    },
    [modalsState],
  );

  return {
    openModal: useCallback(
      (modalType: MODALS, modalProps?: any) => {
        dispatch(openModal({modalType, modalProps}));
      },
      [dispatch],
    ),
    closeModal: useCallback(
      (modal: MODALS) => {
        dispatch(closeModal({modal}));
      },
      [dispatch],
    ),
    getModalOpen,
  };
}

export default function AppModals() {
  const modalsState = useSelector(
    (state: RootState) => state.modals,
  ) as ModalsState;
  const dispatch = useDispatch();

  const handleClose = useCallback(
    (modal: MODALS) => {
      dispatch(closeModal({modal}));
    },
    [dispatch],
  );

  const modals = useMemo(
    () => Object.keys(modalsState) as MODALS[],
    [modalsState],
  );

  if (modals.length === 0) {
    return null;
  }

  return (
    <>
      {modals.map(modal => {
        const state = modalsState[modal] || {visible: false, props: {}};
        const modalProps = {
          visible: state.visible,
          onClose: () => handleClose(modal),
          ...state.props,
        };
        const ModalComponent = Modals[modal] as React.FC<ModalBaseProps & any>;
        return (
          <Suspense key={modal} fallback={<></>}>
            <ModalComponent {...modalProps} />
          </Suspense>
        );
      })}
    </>
  );
}
