import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SignUpStackParams} from 'navigation/RootStack/MainStack/SignUpStack';
import useSignIn from './hooks/useSignIn';

type SignInScreenNavigationProp = StackNavigationProp<
  SignUpStackParams,
  'SignInScreen'
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({navigation}: Props) {
  const {
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    otpSent,
    sendOtp,
    verifyOtp,
    error,
    timer,
    handlePhoneNumberConfirm,
    handlePhoneNumberReset,
    isPhoneNumberConfirmed,
  } = useSignIn(navigation);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.image}
          source={{uri: 'https://via.placeholder.com/150'}}
        />
        <Text style={styles.label}>PHONE NUMBER</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Enter your phone number"
          placeholderTextColor="#888"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={
            !isPhoneNumberConfirmed ||
            error === 'Please enter a valid 10-digit phone number.'
          }
        />
        {isPhoneNumberConfirmed &&
          error !== 'Please enter a valid 10-digit phone number.' && (
            <TouchableOpacity onPress={handlePhoneNumberReset}>
              <Text style={styles.resetText}>Change Phone Number</Text>
            </TouchableOpacity>
          )}
        {otpSent && isPhoneNumberConfirmed && (
          <>
            <Text style={styles.label}>OTP</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Enter OTP"
              placeholderTextColor="#888"
              value={otp}
              onChangeText={setOtp}
            />
          </>
        )}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.button}
          onPress={otpSent ? verifyOtp : handlePhoneNumberConfirm}
          disabled={!phoneNumber || (otpSent && !otp)}>
          <Text style={styles.buttonText}>
            {otpSent ? 'VERIFY OTP' : 'SEND OTP'}
          </Text>
        </TouchableOpacity>
        {otpSent && (
          <Text style={styles.timerText}>
            {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#333',
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  resetText: {
    color: '#1E90FF',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  timerText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
