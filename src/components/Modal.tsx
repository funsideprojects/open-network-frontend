import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div<Partial<Props & { open: boolean }>>`
  pointer-events: ${(props) => (!props.hasMask ? 'none' : 'initial')};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.centered ? 'center' : 'flex-start')};
  background-color: ${(props) => props.theme.colors.overlay[props.open ? 'opaque' : 'none']};
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  z-index: ${(props) => props.theme.zIndex.lg};
  transition: 0.3s;
`

const Content = styled.div<Partial<Props & { open: boolean }>>`
  ${(props) => (props.width ? `width: ${props.width}px` : 'min-width: 500px')};
  max-width: 90%;
  height: auto;
  max-height: 90%;
  overflow-x: hidden;
  border-radius: ${(props) => props.theme.radius.lg};
  margin-top: ${(props) => props.theme.spacing[props.centered ? 'none' : 'lg']};
  background: ${(props) => props.theme.colors.white};
  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: ${(props) => (props.open ? 'translateY(0)' : `translateY(-${props.theme.spacing.lg})`)};
  transition: 0.3s;

  &::-webkit-scrollbar {
    display: none;
  }
`

export interface ModalRefAttributes {
  open: () => void
  close: () => void
}

const portalMountPoint = document.getElementById('portal-mountpoint')
const Component = React.forwardRef<ModalRefAttributes, Props>(
  ({ hasMask, maskClosable, defaultOpen = false, centered, width, children }, forwardedRef) => {
    const [open, setOpen] = React.useState(defaultOpen)

    // ? Modifies ref attributes
    React.useImperativeHandle(forwardedRef, () => ({
      open() {
        setOpen(true)
      },
      close() {
        setOpen(false)
      },
    }))

    // ? Prevents body scroll when modal is open
    React.useEffect(() => {
      if (open && hasMask) {
        const now = Date.now()
        document.body.classList.add(`no-scroll-${now}`)

        return () => {
          document.body.classList.remove(`no-scroll-${now}`)
        }
      }
    }, [open, hasMask])

    // ? Closes modal on pressing Esc key
    React.useEffect(() => {
      if (open && hasMask && maskClosable) {
        const keyDownListener = (event: KeyboardEvent) => {
          const key = event.key || event.keyCode

          if (key && (key === 'Escape' || key === 27)) {
            setOpen(false)
          }
        }

        document.addEventListener('keydown', keyDownListener)

        return () => {
          document.removeEventListener('keydown', keyDownListener)
        }
      }
    }, [open, hasMask, maskClosable])

    return ReactDOM.createPortal(
      <Container
        open={open}
        hasMask={hasMask}
        centered={centered}
        {...(maskClosable ? { onClick: () => setOpen(false) } : {})}
      >
        <Content open={open} centered={centered} width={width} onClick={(event) => event.stopPropagation()}>
          {children}
        </Content>
      </Container>,
      portalMountPoint
    )
  }
)

Component.displayName = 'Modal'

const componentPropTypes = {
  children: PropTypes.node,
  hasMask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  unmountOnClose: PropTypes.bool,
  centered: PropTypes.bool,
  width: PropTypes.number,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Component
