import React, {useMemo} from 'react';
import {
  TouchableOpacity,
  GestureResponderEvent,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from 'theme';

interface ButtonTabProps {
  text: string;
  icon: string;
  iconSize?: number;
  active?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function ButtonTab({
  onPress,
  iconSize,
  ...props
}: ButtonTabProps) {
  const iconFontSize = iconSize || 27;
  const {color, textStyle} = useMemo(
    () => ({
      color: props.active ? colors.primary : colors.gray[0],
      textStyle: props.active ? styles.textActive : styles.text,
    }),
    [props.active],
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={props.icon} size={iconFontSize} color={color} />
        <Text style={[styles.text, textStyle]}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  text: {
    marginTop: 2,
    fontSize: 12,
    textAlign: 'center',
    color: colors.gray[0],
  },
  textActive: {
    color: colors.primary,
  },
});
