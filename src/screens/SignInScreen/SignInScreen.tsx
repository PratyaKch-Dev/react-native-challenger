import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
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
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PasscodeScreen')}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
