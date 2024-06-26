import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store';
import RootStack from './navigation/RootStack';
import Modals from 'components/AppModals';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootStack />
        <Modals />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
