import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Image from 'components/Image'
import { getImageLink } from 'utils/image-link'

import { UserIcon } from './icons'

const Container = styled.div<{ size?: number }>`
  user-select: none;
  width: ${(props) => (props.size ? `${props.size}px` : '30px')};
  height: ${(props) => (props.size ? `${props.size}px` : '30px')};
  position: relative;
  border-radius: 50%;
  flex-shrink: 0;
`

const Img = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`

const DotLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

const Dot = styled.div`
  width: 8px;
  height: 8px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  box-shadow: 0px 0px 1px 1px #d9f7be;
  border-radius: 100%;
  background: radial-gradient(#95de64, #73d13d, #52c41a);
`

const Avatar = ({ size, image, online }: Props) => (
  <Container size={size}>
    {image ? (
      <Img src={getImageLink(image)} />
    ) : (
      <UserIcon width={size ? `${size}px` : 30} style={{ position: 'absolute' }} />
    )}

    {online && (
      <DotLayer>
        <Dot />
      </DotLayer>
    )}
  </Container>
)

const componentPropTypes = {
  size: PropTypes.number,
  image: PropTypes.string,
  online: PropTypes.bool,
}

Avatar.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Avatar
