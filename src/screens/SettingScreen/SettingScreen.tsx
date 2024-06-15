import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export type SettingScreenParams = undefined;

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <SettingItem title="RESET PIN" onPress={() => {}} />
      <SettingItem title="LOGOUT" onPress={() => {}} />
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  settingItem: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  settingText: {
    fontSize: 16,
    textAlign: 'left',
  },
});
