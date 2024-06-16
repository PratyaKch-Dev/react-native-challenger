import {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SignUpStackParams} from 'navigation/RootStack/MainStack/SignUpStack';
import useUser from 'hooks/useUser';

type SignInScreenNavigationProp = StackNavigationProp<
  SignUpStackParams,
  'SignInScreen'
>;

export default function useSignIn(navigation: SignInScreenNavigationProp) {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [isPhoneNumberConfirmed, setIsPhoneNumberConfirmed] =
    useState<boolean>(false);

  const {login} = useUser();

  const sendOtp = useCallback(() => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
      setTimer(60);
      setError('');
      setIsPhoneNumberConfirmed(true);
    } else {
      setError('Please enter a valid 10-digit phone number.');
      setIsPhoneNumberConfirmed(false);
    }
  }, [phoneNumber]);

  const verifyOtp = useCallback(() => {
    if (otp === '1234') {
      const token = 'exampleToken123';
      login(token);
      navigation.navigate('PasscodeScreen');
      setError('');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  }, [otp, navigation, login]);

  const handlePhoneNumberConfirm = useCallback(() => {
    sendOtp();
  }, [sendOtp]);

  const handlePhoneNumberReset = useCallback(() => {
    setPhoneNumber('');
    setOtp('');
    setOtpSent(false);
    setIsPhoneNumberConfirmed(false);
    setError('');
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setOtpSent(false);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [otpSent, timer]);

  useFocusEffect(
    useCallback(() => {
      setPhoneNumber('');
      setOtp('');
      setOtpSent(false);
      setIsPhoneNumberConfirmed(false);
      setError('');
      setTimer(0);
    }, []),
  );

  return {
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    otpSent,
    setOtpSent,
    sendOtp,
    verifyOtp,
    error,
    setError,
    timer,
    handlePhoneNumberConfirm,
    handlePhoneNumberReset,
    isPhoneNumberConfirmed,
  };
}
