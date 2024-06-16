import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store';
import RootStack from './navigation/RootStack';
import ModalErrorProvider from 'contexts/ModalErrorContext';
import ErrorModal from 'components/ErrorModal';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalErrorProvider>
          <RootStack />
          <ErrorModal />
        </ModalErrorProvider>
      </PersistGate>
    </Provider>
  );
}
