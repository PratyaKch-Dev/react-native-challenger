import React from 'react';
import {View, Text, Button, StyleSheet, Modal} from 'react-native';
import {useDispatch} from 'react-redux';
import {closeModal} from 'store/modals/actions';
import {MODALS} from 'components/AppModals/Modals';

interface ModalHandlerErrorProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const ModalHandlerError: React.FC<ModalHandlerErrorProps> = ({
  message,
  visible,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal({modal: MODALS.MODAL_HANDLER_ERROR}));
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.errorMessage}>{message}</Text>
          <Button title="Close" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  errorMessage: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ModalHandlerError;
