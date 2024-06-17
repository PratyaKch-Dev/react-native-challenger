import React, {useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import ButtonTab from './components/ButtonTab';

import styles from './TabBarMain.style';

export default function TabBarMain({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const isActiveButtonHome = state.routes[state.index].name === 'HomeScreen';
  const isActiveButtonMenu =
    state.routes[state.index].name === 'WithDrawScreen';
  const isActiveButtonSetting =
    state.routes[state.index].name === 'SettingScreen';

  const insets = useSafeAreaInsets();

  const {containerHeight, styleInner} = useMemo(
    () => ({
      containerHeight: insets.bottom + 70 - 19,
      styleInner: {
        paddingBottom: insets.bottom ? insets.bottom + 2 : 5,
        height: insets.bottom + 70,
      },
    }),
    [insets.bottom],
  );

  const tabBarStyle = focusedOptions.tabBarStyle as ViewStyle | undefined;

  if (tabBarStyle?.display === 'none') {
    return null;
  }

  return (
    <View style={[styles.container, {height: containerHeight}]}>
      <View style={[styles.inner, styleInner]}>
        <ButtonTab
          icon="home"
          text={'HOME'}
          active={isActiveButtonHome}
          iconSize={34}
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <ButtonTab
          icon="money"
          iconSize={30}
          text={'WITHDRAW'}
          active={isActiveButtonMenu}
          onPress={() => navigation.navigate('WithDrawScreen')}
        />
        <ButtonTab
          icon="cog"
          iconSize={30}
          text={'SETTING'}
          active={isActiveButtonSetting}
          onPress={() => navigation.navigate('SettingScreen')}
        />
      </View>
    </View>
  );
}
