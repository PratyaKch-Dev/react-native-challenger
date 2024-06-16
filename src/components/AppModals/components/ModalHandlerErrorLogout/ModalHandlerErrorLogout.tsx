import React from 'react';
import {View, Text, Button, StyleSheet, Modal} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearUser} from 'store/user/actions';
import {closeModal} from 'store/modals/actions';
import {MODALS} from 'components/AppModals/Modals';
import * as Keychain from 'react-native-keychain';
// import Navigate from 'navigation/navigate';
import RNRestart from 'react-native-restart';

interface ModalHandlerErrorLogoutProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const ModalHandlerErrorLogout: React.FC<ModalHandlerErrorLogoutProps> = ({
  message,
  visible,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await Keychain.resetGenericPassword();
    dispatch(clearUser());
    dispatch(closeModal({modal: MODALS.MODAL_HANDLER_ERROR_LOGOUT}));
    // Navigate()?.reset({
    //   index: 0,
    //   routes: [{name: 'SignUpStack', params: {screen: 'SignInScreen'}}],
    // });
    onClose();
    RNRestart.Restart();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.errorMessage}>{message}</Text>
          <Button title="Logout" onPress={handleLogout} />
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

export default ModalHandlerErrorLogout;
