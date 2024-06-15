import React, {useMemo} from 'react';
import {TouchableOpacity, GestureResponderEvent} from 'react-native';

import {colors} from 'theme';

// import Icon, { Icons } from 'components/Icon'
import Text from 'components/Text';

import styles from './ButtonTab.style';

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
      {/* <Icon
        name={props.icon as keyof typeof Icons}
        color={color}
        fontSize={iconFontSize}
        style={styles.icon}
      /> */}
      <Text fontSize="1" mt="2px" textAlign="center" style={textStyle}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
