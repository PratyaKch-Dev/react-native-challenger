import {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SignUpStackParams} from 'navigation/RootStack/MainStack/SignUpStack';
import useUser from 'hooks/useUser';
import {useDispatch} from 'react-redux';
import {openModal} from 'store/modals/actions';
import {MODALS} from 'components/AppModals/Modals';

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
  const dispatch = useDispatch();

  const {handleSignIn} = useUser();

  const resetState = useCallback(() => {
    setPhoneNumber('');
    setOtp('');
    setOtpSent(false);
    setIsPhoneNumberConfirmed(false);
    setError('');
    setTimer(0);
  }, []);

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
      navigation.navigate('PasscodeScreen');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  }, [otp, navigation, phoneNumber, handleSignIn, dispatch]);

  const handlePhoneNumberConfirm = useCallback(() => {
    handleSignIn(phoneNumber)
      .then(() => {
        sendOtp();
      })
      .catch(error => {
        const errorMessage =
          error && typeof error === 'object' && 'message' in error
            ? (error as {message: string}).message
            : 'An unexpected error occurred';
        dispatch(
          openModal({
            modalType: MODALS.MODAL_HANDLER_ERROR,
            modalProps: {message: errorMessage},
          }),
        );
      });
  }, [sendOtp]);

  const handlePhoneNumberReset = useCallback(() => {
    resetState();
  }, [resetState]);

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
      resetState();
    }, [resetState]),
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
