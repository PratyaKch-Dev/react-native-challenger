import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import useSettings from './hooks/useSettings';
import styles from './SettingScreen.style';

export type SettingScreenParams = undefined;

export default function SettingScreen() {
  const {resetPin, logout} = useSettings();

  return (
    <View style={styles.container}>
      <SettingItem title="RESET PIN" onPress={resetPin} />
      <SettingItem title="LOGOUT" onPress={logout} />
    </View>
  );
}

function SettingItem({title, onPress}: {title: string; onPress: () => void}) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <Text style={styles.settingText}>{title}</Text>
    </TouchableOpacity>
  );
}
