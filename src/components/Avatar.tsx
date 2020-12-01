import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Image from 'components/Image'
import { getImageLink } from 'utils/image-link'

import { DefaultAvatar } from './icons'

const Container = styled.div<{ size: number; border?: 'success' | 'secondary' }>`
  user-select: none;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  position: relative;
  display: flex;
  box-shadow: 0 0 1px 2px ${(props) => (props.border ? props.theme.colors[props.border].dark : 'transparent')};
  border: 1px solid white;
  border-radius: 50%;
  flex-shrink: 0;
`

const Img = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`

const Avatar = ({ size, image, username, hasStory, online }: Props) => (
  <Container size={size ?? 30} border={hasStory ? 'secondary' : online ? 'success' : undefined}>
    {image ? <Img src={getImageLink(image)} alt={username} /> : <DefaultAvatar width={`${(size ?? 30) - 1}px`} />}
  </Container>
)

const componentPropTypes = {
  size: PropTypes.number,
  image: PropTypes.string,
  username: PropTypes.string.isRequired,
  online: PropTypes.bool,
  hasStory: PropTypes.bool,
}

Avatar.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Avatar
