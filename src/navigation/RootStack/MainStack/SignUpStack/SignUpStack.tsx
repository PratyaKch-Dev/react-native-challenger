import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from 'screens/SignInScreen';
import PasscodeScreen from 'screens/PasscodeScreen';

export type SignUpStackParams = {
  SignInScreen: undefined;
  PasscodeScreen: undefined;
};

const Stack = createStackNavigator<SignUpStackParams>();

export default function SignUpStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PasscodeScreen"
        component={PasscodeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
