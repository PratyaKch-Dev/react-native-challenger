import React, {useMemo} from 'react'
import {Text as TextNative, TextProps as TextNativeProps} from 'react-native'

import styled from 'styled-components'
import {
  typography,
  TypographyProps,
  space,
  SpaceProps,
  color,
  ColorProps,
} from 'styled-system'

import {colors, fonts, fontSizes} from 'theme'
import {fontSizeDefault} from 'theme/fontSizes'

export interface TextProps
  extends TextNativeProps,
    TypographyProps,
    SpaceProps,
    ColorProps {
  id?: string
  children: React.ReactNode
}

const TextStyled = styled(TextNative)<TextProps>`
  ${typography}
  ${space}
  ${color}
`

export default function Text(props: TextProps) {
  const fontFamily = props.fontFamily || fonts.sarabun
  const fontWeight = props.fontWeight || 'normal'
  const fontSizeIndex = props.fontSize || fontSizeDefault
  const lineHeight = useMemo(() => {
    const index = parseInt(String(fontSizeIndex), 10)
    const lh =
      typeof fontSizeIndex === 'string' && fontSizeIndex.includes('px')
        ? index
        : fontSizes[index] || index
    return lh + (1 * 100) / lh
  }, [fontSizeIndex])

  let xProps = {
    ...props,
    color: props.color || colors.text,
    fontFamily,
    fontWeight,
    fontSize: fontSizeIndex,
    lineHeight: props.lineHeight || `${lineHeight}px`,
    allowFontScaling: false,
  }
  if (props.id) {
    xProps = {
      ...xProps,
    }
  }
  return <TextStyled {...xProps}>{props.children}</TextStyled>
}
