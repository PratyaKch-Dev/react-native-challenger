import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab, {MainTabParams} from './MainTab';
import SignUpStack, {SignUpStackParams} from './SignUpStack';
import {NavigatorScreenParams} from '@react-navigation/native';
import ButtonIcon from 'components/ButtonIcon';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import useUser from 'hooks/useUser';

export type MainStackParams = {
  MainTab: NavigatorScreenParams<MainTabParams>;
  SignUpStack: NavigatorScreenParams<SignUpStackParams>;
};

const styles = StyleSheet.create({
  spacer: {
    width: 48,
    height: 48,
  },
});

const Stack = createStackNavigator<MainStackParams>();

export default function MainStack() {
  const [initialRoute, setInitialRoute] = useState<
    keyof MainStackParams | undefined
  >();
  const [initialParams, setInitialParams] = useState<any>({});

  const token = useSelector((state: RootState) => state.user.token);
  const {getPasscode} = useUser();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const passcode = await getPasscode();
      const isLoggedIn = !!token && !!passcode;

      const navInit = isLoggedIn
        ? {
            screen: 'SignUpStack' as keyof MainStackParams,
            params: {
              screen: 'PasscodeScreen',
            },
          }
        : {
            screen: 'SignUpStack' as keyof MainStackParams,
            params: {
              screen: 'SignUpScreen',
            },
          };

      setInitialParams(navInit.params);
      setInitialRoute(navInit.screen);
    };

    checkLoginStatus();
  }, [token, getPasscode]);

  return initialRoute ? (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitleStyle: {
          alignSelf: 'center',
          fontWeight: 'normal',
          lineHeight: 30,
        },
        headerTitleAllowFontScaling: false,
        headerLeftContainerStyle: {
          marginLeft: 3,
        },
        headerRightContainerStyle: {
          marginRight: 3,
        },
        headerLeft: props => (
          <ButtonIcon name={'arrow-back'} fontSize={24} {...props} />
        ),
        headerRight: () => <View style={styles.spacer} />,
      }}>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpStack"
        component={SignUpStack}
        initialParams={initialParams}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  ) : null;
}
