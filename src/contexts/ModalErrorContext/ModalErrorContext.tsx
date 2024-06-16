import React, {createContext, useState, useContext, ReactNode} from 'react';

interface ModalErrorContextProps {
  isVisible: boolean;
  message: string;
  openModalError: (message: string) => void;
  closeModalError: () => void;
}

const ModalErrorContext = createContext<ModalErrorContextProps | undefined>(
  undefined,
);

const ModalErrorProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const openModalError = (message: string) => {
    setMessage(message);
    setIsVisible(true);
  };

  const closeModalError = () => {
    setIsVisible(false);
    setMessage('');
  };

  return (
    <ModalErrorContext.Provider
      value={{isVisible, message, openModalError, closeModalError}}>
      {children}
    </ModalErrorContext.Provider>
  );
};

export const useModalError = (): ModalErrorContextProps => {
  const context = useContext(ModalErrorContext);
  if (!context) {
    throw new Error('useModalError must be used within a ModalErrorProvider');
  }
  return context;
};

export default ModalErrorProvider;
