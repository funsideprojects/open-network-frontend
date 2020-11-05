import React from 'react'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'

export const Overlay = styled.div<Props>`
  width: 100%;
  height: 100%;
  position: ${(props) => (props.block ? 'relative' : 'fixed')};
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(p) => p.theme.colors.overlay.translucent};
  z-index: ${(p) => p.theme.zIndex.xl};
`

const Container = styled.div`
  border-radius: ${(props) => props.theme.radius.md};
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.overlay.opaque};
`

const StyledLoadingOutlined = styled(LoadingOutlined)`
  font-size: 32px;
  color: ${(props) => props.theme.colors.primary.light};
`

interface Props {
  overlay?: boolean
  block?: boolean
}

export const Loading = ({ overlay, block }: Props) => {
  if (overlay || block) {
    return (
      <Overlay block={block}>
        <Container>
          <StyledLoadingOutlined />
        </Container>
      </Overlay>
    )
  }

  return <StyledLoadingOutlined />
}

/**
 * Displays loading dots
 */
export const LoadingDots = styled.div`
  &::after {
    content: '.';
    display: block;
    animation: ellipsis 1s infinite;
    text-align: center;
    font-size: ${(p) => p.theme.font.size.xl};
    color: ${(p) => (p.color ? p.theme.colors[p.color] : p.theme.colors.text.secondary)};
  }

  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`

export const WrapperLoading = styled.div`
  padding: 24px;
`
