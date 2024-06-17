import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setUser, clearUser} from '../store/user/actions';
import * as Keychain from 'react-native-keychain';
import authService from 'services/api/authService';
import {SignInResponseDataSuccess} from 'services/api/authService/signin';

const useUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  const login = useCallback(
    (token: string, phone: string) => {
      dispatch(setUser({token, phone}));
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(clearUser());
    Keychain.resetGenericPassword();
  }, [dispatch]);

  const savePasscode = useCallback(async (passcode: string) => {
    try {
      await Keychain.setGenericPassword('userPasscode', passcode);
    } catch (error) {
      console.error('Could not save passcode', error);
    }
  }, []);

  const getPasscode = useCallback(async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Could not retrieve passcode', error);
      return null;
    }
  }, []);

  const handleSignIn = useCallback(
    async (phoneInput: string): Promise<void> => {
      try {
        const response = await authService().signin({
          phone: phoneInput,
        });
        const data = response.data as SignInResponseDataSuccess;
        const {token, phone} = data.data;
        login(token, phone);
      } catch (error) {
        throw error;
      }
    },
    [login],
  );

  const resetPin = useCallback(() => {
    Keychain.resetGenericPassword();
  }, []);

  return {
    token,
    login,
    logout,
    savePasscode,
    getPasscode,
    handleSignIn,
    resetPin,
  };
};

export default useUser;
