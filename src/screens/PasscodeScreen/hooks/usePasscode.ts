import {useState, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParams} from 'navigation/RootStack/MainStack';

type MainStackNavigationProp = StackNavigationProp<MainStackParams, 'MainTab'>;

export default function usePasscode() {
  const navigation = useNavigation<MainStackNavigationProp>();
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState('');
  const [isSettingPasscode, setIsSettingPasscode] = useState(true);

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
    if (isSettingPasscode && passcode.length === 6) {
      setIsSettingPasscode(false);
    } else if (!isSettingPasscode && confirmPasscode.length === 6) {
      if (passcode === confirmPasscode) {
        setError('');
        navigation.navigate('MainTab', {screen: 'HomeScreen'});
      } else {
        setError('Passcodes do not match. Please try again.');
        setConfirmPasscode('');
      }
    }
  }, [isSettingPasscode, passcode, confirmPasscode, navigation]);

  const resetPasscode = useCallback(() => {
    setPasscode('');
    setConfirmPasscode('');
    setError('');
    setIsSettingPasscode(true);
  }, []);

  return {
    passcode,
    confirmPasscode,
    error,
    isSettingPasscode,
    handlePress,
    resetPasscode,
  };
}
