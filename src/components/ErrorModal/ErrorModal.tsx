import React from 'react';
import {Modal, View, Text, Button, StyleSheet} from 'react-native';
import {useModalError} from 'contexts/ModalErrorContext';

const ErrorModal: React.FC = () => {
  const {isVisible, message, closeModalError} = useModalError();

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.errorMessage}>{message}</Text>
          <Button title="Close" onPress={closeModalError} />
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

export default ErrorModal;
