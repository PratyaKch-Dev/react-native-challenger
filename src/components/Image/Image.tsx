import React from 'react'
import styled from 'styled-components'
import {space, SpaceProps, layout, LayoutProps} from 'styled-system'
import FastImage, {FastImageProps} from 'react-native-fast-image'

export type ImageProps = SpaceProps & LayoutProps & FastImageProps

function Image(props: ImageProps) {
  const xProps = {
    ...props,
  }

  return <FastImage {...xProps} />
}
export default styled(Image)<ImageProps>`
  ${space}
  ${layout}
`
