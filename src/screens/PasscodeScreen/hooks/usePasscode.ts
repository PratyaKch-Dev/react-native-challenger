import {useState, useCallback, useEffect} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParams} from 'navigation/RootStack/MainStack';
import useUser from 'hooks/useUser';

type MainStackNavigationProp = StackNavigationProp<MainStackParams, 'MainTab'>;

export default function usePasscode() {
  const navigation = useNavigation<MainStackNavigationProp>();
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState('');
  const [isSettingPasscode, setIsSettingPasscode] = useState(true);
  const [existingPasscode, setExistingPasscode] = useState<string | null>(null);

  const {savePasscode, getPasscode, logout} = useUser();

  const handlePress = useCallback(
    (value: string) => {
      if (value === 'clear') {
        if (isSettingPasscode) {
          setPasscode(prev => prev.slice(0, -1));
        } else {
          setConfirmPasscode(prev => prev.slice(0, -1));
        }
      } else {
        if (isSettingPasscode && passcode.length < 6) {
          setPasscode(prev => prev + value);
        } else if (!isSettingPasscode && confirmPasscode.length < 6) {
          setConfirmPasscode(prev => prev + value);
        }
      }
    },
    [isSettingPasscode, passcode, confirmPasscode],
  );

  useEffect(() => {
    const checkExistingPasscode = async () => {
      const storedPasscode = await getPasscode();
      if (storedPasscode) {
        setExistingPasscode(storedPasscode);
        setIsSettingPasscode(false);
      }
    };

    checkExistingPasscode();
  }, [getPasscode]);

  useEffect(() => {
    if (isSettingPasscode && passcode.length === 6) {
      setIsSettingPasscode(false);
    } else if (
      !isSettingPasscode &&
      confirmPasscode.length === 6 &&
      existingPasscode
    ) {
      validatePasscode(confirmPasscode);
    } else if (!isSettingPasscode && confirmPasscode.length === 6) {
      if (passcode === confirmPasscode) {
        setError('');
        savePasscode(passcode);
        navigation.navigate('MainTab', {screen: 'HomeScreen'});
      } else {
        setError('Passcodes do not match. Please try again.');
        setConfirmPasscode('');
      }
    }
  }, [
    isSettingPasscode,
    passcode,
    confirmPasscode,
    navigation,
    savePasscode,
    existingPasscode,
  ]);

  const validatePasscode = async (inputPasscode: string) => {
    if (existingPasscode === inputPasscode) {
      navigation.navigate('MainTab', {screen: 'HomeScreen'});
    } else {
      setError('Incorrect passcode. Please try again.');
      setConfirmPasscode('');
    }
  };

  const resetPasscode = useCallback(() => {
    setPasscode('');
    setConfirmPasscode('');
    setError('');
    setIsSettingPasscode(true);
  }, []);

  const forgotPasscode = useCallback(() => {
    logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignUpStack', params: {screen: 'SignInScreen'}}],
      }),
    );
  }, [navigation, logout]);

  return {
    passcode,
    confirmPasscode,
    error,
    isSettingPasscode,
    handlePress,
    resetPasscode,
    forgotPasscode,
    existingPasscode,
  };
}
