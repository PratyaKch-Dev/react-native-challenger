import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setUser, clearUser} from '../store/user/actions';
import * as Keychain from 'react-native-keychain';

const useUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  const login = useCallback(
    (token: string) => {
      dispatch(setUser({token}));
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

  return {
    token,
    login,
    logout,
    savePasscode,
    getPasscode,
  };
};

export default useUser;
