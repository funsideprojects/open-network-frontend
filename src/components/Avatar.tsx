import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Image from 'components/Image'
import { DotFlashing } from 'components/icons'
import { getImageLink } from 'utils/image-link'

import { DefaultAvatar } from './icons'

const Container = styled.div<{ size: string; border?: 'success' | 'secondary'; badge: number; badgeVisible: boolean }>`
  user-select: none;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  position: relative;
  display: flex;
  box-shadow: 0 0 1px 2px ${(props) => (props.border ? props.theme.colors[props.border].dark : 'transparent')};
  border: 2px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 50%;
  flex-shrink: 0;

  &::before {
    content: '${(props) => (props.badge ? (props.badge > 99 ? '99+' : props.badge) : '')}';
    max-width: 23px;
    position: absolute;
    top: -6px;
    right: 0;
    left: 0;
    border: 2px solid ${(props) => props.theme.colors.grey[200]};
    border-radius: ${(props) => props.theme.radius.lg};
    margin: 0 auto;
    padding: 2px 3px;
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 0.6rem;
    line-height: normal;
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.error.dark};
    transform: scale(${(props) => (props.badgeVisible && props.badge ? 1 : 0)});
    transform-origin: top;
    transition: 0.3s;
  }

  > svg {
    width: 100%;
  }
`

const Img = styled(Image)`
  position: absolute;
  object-fit: cover;
  border-radius: 50%;
`

const TypingDots = styled.div<{ visible: boolean }>`
  width: ${(props) => (props.visible ? 'fit-content' : 0)};
  height: 12px;
  position: absolute;
  right: -2px;
  bottom: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: ${(props) => props.theme.radius.md};
  background: ${(props) => props.theme.colors.grey[600]};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: 0.3s;
`

const Avatar = ({ size, image, username, hasStory, online, badge, badgeVisible = true, typing }: Props) => {
  return (
    <Container
      size={typeof size === 'string' ? size : '30px'}
      border={hasStory ? 'secondary' : online ? 'success' : undefined}
      badge={badge ?? 0}
      badgeVisible={!!badgeVisible}
    >
      {image ? <Img src={getImageLink(image)} alt={username} /> : <DefaultAvatar />}
      <TypingDots visible={!!typing}>
        <DotFlashing />
      </TypingDots>
    </Container>
  )
}

const componentPropTypes = {
  size: PropTypes.string,
  image: PropTypes.string,
  username: PropTypes.string.isRequired,
  hasStory: PropTypes.bool,
  online: PropTypes.bool,
  badge: PropTypes.number,
  badgeVisible: PropTypes.bool,
  typing: PropTypes.bool,
}

Avatar.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Avatar
