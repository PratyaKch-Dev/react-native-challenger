import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';
import Image from 'components/Image';
import styles from './ButtonIcon.style';

export interface ButtonIconProps extends SpaceProps, TouchableOpacityProps {
  name: string;
  fontSize: number;
  width?: number;
  height?: number;
  color?: string;
  id?: string;
}

function ButtonIcon({
  name,
  fontSize,
  width,
  height,
  color,
  id,
  ...props
}: ButtonIconProps) {
  return (
    <TouchableOpacity {...props}>
      <View
        style={[
          styles.container,
          {
            width: width || 48,
            height: height || 48,
          },
        ]}>
        <>
          {name === 'arrow-back' && (
            <Image
              source={require('./images/Back.png')}
              style={{width: fontSize, height: fontSize}}
            />
          )}
        </>
      </View>
    </TouchableOpacity>
  );
}

export default styled(ButtonIcon)<ButtonIconProps>`
  ${space}
`;
