import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SignUpStackParams} from 'navigation/RootStack/MainStack/SignUpStack';

type SignInScreenNavigationProp = StackNavigationProp<
  SignUpStackParams,
  'SignInScreen'
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      <Button
        title="Go to Passcode"
        onPress={() => navigation.navigate('PasscodeScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
