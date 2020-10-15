import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { UserIcon } from './icons'

import { getImageLink } from 'utils/image-link'

const Root = styled.div`
  user-select: none;
  width: ${(p) => (p.size ? `${p.size}px` : '30px')};
  height: ${(p) => (p.size ? `${p.size}px` : '30px')};
  border-radius: 50%;
  /* overflow: hidden; */
  flex-shrink: 0;
  position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: 50%;
`

const DotLayer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`

const Dot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 100%;
  background: radial-gradient(#95de64, #73d13d, #52c41a);
  box-shadow: 0px 0px 1px 1px #d9f7be;
  position: absolute;
  right: 0px;
  bottom: 0px;
`

/**
 * Component for rendering user's image
 */
const Avatar = memo(({ size, image, isOnline = false }) => (
  <Root size={size}>
    {image ? (
      <Image src={getImageLink(image)} />
    ) : (
      <UserIcon width={size ? `${size}px` : 30} style={{ position: 'absolute' }} />
    )}

    {isOnline && (
      <DotLayer>
        <Dot />
      </DotLayer>
    )}
  </Root>
))

Avatar.propTypes = {
  size: PropTypes.number,
  image: PropTypes.string,
}

export default Avatar
