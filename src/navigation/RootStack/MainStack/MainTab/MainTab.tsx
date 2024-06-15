import React, {useEffect} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import WithDrawScreen, {WithDrawScreenParams} from 'screens/WithDrawScreen';
import TabBarMain from 'components/TabBarMain';
import HomeScreen, {HomeScreenParams} from 'screens/HomeScreen';
import SettingScreen, {SettingScreenParams} from 'screens/SettingScreen';

const Tab = createBottomTabNavigator();

export type MainTabParams = {
  HomeScreen: HomeScreenParams;
  WithDrawScreen: WithDrawScreenParams;
  SettingScreen: SettingScreenParams;
};

export default function MainTab() {
  return (
    <Tab.Navigator
      tabBar={(props: BottomTabBarProps) => <TabBarMain {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Tab.Screen name="WithDrawScreen" component={WithDrawScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
    </Tab.Navigator>
  );
}
