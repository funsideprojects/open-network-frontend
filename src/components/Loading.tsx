import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { Spinner3 } from '@styled-icons/evil/Spinner3'

export const Overlay = styled.div<Partial<LoadingPropTypes>>`
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
  border-radius: ${(props) => props.theme.radius[props.radiusBorder ? 'md' : 'none']};
  padding: ${(props) => (props.block ? '60px' : '0')};
  background: ${(props) => props.theme.colors.overlay.translucent};
  z-index: ${(props) => props.theme.zIndex.xxl};
`

const Container = styled.div<Partial<LoadingPropTypes>>`
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

const SCISpinner = styled(Spinner3)<{ large?: boolean }>`
  ${(props) =>
    props.large
      ? `
width: 30px !important;
height: 30px !important;
  `
      : ''}
  color: ${(props) => props.theme.colors.primary.light};
  animation: 1.5s linear ${spinAnimation} infinite;
`

const Loading = ({ overlay, block, radiusBorder }: LoadingPropTypes) => {
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
      <Overlay block={block} radiusBorder={radiusBorder}>
        <Container block={block}>
          <SCISpinner large />
        </Container>
      </Overlay>
    )
  }

  return <SCISpinner />
}

const loadingPropTypes = {
  overlay: PropTypes.bool,
  block: PropTypes.bool,
  radiusBorder: PropTypes.bool,
}

Loading.propTypes = loadingPropTypes
type LoadingPropTypes = PropTypes.InferProps<typeof loadingPropTypes>

export default Loading
