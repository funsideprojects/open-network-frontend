import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Spinner3 } from '@styled-icons/evil/Spinner3'

export const Overlay = styled.div<Props>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: ${(props) => (props.block ? 'relative' : 'fixed')};
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.overlay.translucent};
  z-index: ${(props) => props.theme.zIndex.xxl};
`

const Container = styled.div`
  border-radius: ${(props) => props.theme.radius.md};
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.overlay.opaque};
`

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SCSpinner = styled(Spinner3)<{ large?: boolean }>`
  ${(props) =>
    props.large
      ? `
width: 30px !important;
height: 30px !important;
  `
      : ''}
  color: ${(props) => props.theme.colors.primary.light};
  animation: 2s linear ${spinAnimation} infinite;
`

interface Props {
  overlay?: boolean
  block?: boolean
}

export const Loading = ({ overlay, block }: Props) => {
  React.useEffect(() => {
    if (overlay) {
      const now = Date.now()
      document.body.classList.add(`no-scroll-${now}`)

      return () => {
        document.body.classList.remove(`no-scroll-${now}`)
      }
    }
  }, [overlay])

  if (overlay || block) {
    return (
      <Overlay block={block}>
        <Container>
          <SCSpinner large />
        </Container>
      </Overlay>
    )
  }

  return <SCSpinner />
}
