import {useCallback} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import useUser from 'hooks/useUser';

export default function useSettings() {
  const navigation = useNavigation();
  const {resetPin: performResetPin, logout: performLogout} = useUser();

  const resetPin = useCallback(() => {
    performResetPin();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignUpStack', params: {screen: 'PasscodeScreen'}}],
      }),
    );
  }, [performResetPin, navigation]);

  const logout = useCallback(() => {
    performLogout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignUpStack', params: {screen: 'SignInScreen'}}],
      }),
    );
  }, [navigation, performLogout]);

  return {
    resetPin,
    logout,
  };
}
