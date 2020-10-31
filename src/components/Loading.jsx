import React from 'react'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'

const StyledLoadingOutlined = styled(LoadingOutlined)`
  font-size: 30px;
  color: ${(p) => p.theme.colors.white};
`

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: ${(p) => (p.block ? 'relative' : 'fixed')};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(p) => p.theme.colors.overlay.translucent};
  z-index: ${(p) => p.theme.zIndex.xl};
`

const Container = styled.div`
  padding: 30px;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.colors.overlay.opaque};
`

export const Loading = ({ overlay = false, block = false }) => {
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
    display: block;
    animation: ellipsis 1s infinite;
    content: '.';
    text-align: center;
    color: ${(p) => (p.color ? p.theme.colors[p.color] : p.theme.colors.text.secondary)};
    font-size: ${(p) => p.theme.font.size.xl};
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
