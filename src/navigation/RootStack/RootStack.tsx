import React, {useEffect, useRef, useMemo} from 'react';
import {StatusBar} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from 'theme';
import {navigationRef, setReadyNavigationRef} from '../navigate';
import MainStack, {MainStackParams, MainStackScreensParams} from './MainStack';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export type RootStackParams = {
  MainStack: MainStackParams;
};

export type RootScreensParams = {
  MainStack?: NavigatorScreenParams<MainStackScreensParams>;
};

function RootStack() {
  const routeNameRef = useRef<string | undefined>();

  const initialRoute = useMemo(() => {
    return 'MainStack';
  }, []);

  useEffect(() => {
    return () => {
      setReadyNavigationRef(false);
    };
  }, []);

  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onReady={async () => {
        const currentRoute = navigationRef.current?.getCurrentRoute();
        if (currentRoute) {
          routeNameRef.current = currentRoute.name;
        }
        setReadyNavigationRef(true);
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        if (previousRouteName !== currentRouteName) {
          // Handle route change if needed
        }
        routeNameRef.current = currentRouteName;
      }}>
      <StatusBar backgroundColor={colors.black} />
      <Stack.Navigator
        screenOptions={{
          headerTitleAllowFontScaling: false,
        }}
        initialRouteName={initialRoute}>
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
