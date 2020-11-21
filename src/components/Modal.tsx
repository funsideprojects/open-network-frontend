import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div<Partial<ModalProps & { open: boolean }>>`
  ${(props) => (!props.hasMask ? 'pointer-events: none' : '')};
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

const Content = styled.div<Partial<ModalProps & { open: boolean }>>`
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

const Modal = React.forwardRef<ModalRefAttributes, ModalProps>(
  ({ hasMask, maskClosable, defaultOpen, centered, width, children }, forwardedRef) => {
    const [open, setOpen] = React.useState(!!defaultOpen)

    React.useImperativeHandle(forwardedRef, () => ({
      open() {
        setOpen(true)
      },
      close() {
        setOpen(false)
      },
    }))

    React.useEffect(() => {
      if (open) {
        const now = Date.now()
        document.body.classList.add(`no-scroll-${now}`)

        return () => {
          document.body.classList.remove(`no-scroll-${now}`)
        }
      }
    }, [open])

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

    return (
      <Root
        open={open}
        hasMask={hasMask}
        centered={centered}
        {...(maskClosable ? { onClick: () => setOpen(false) } : {})}
      >
        <Content open={open} centered={centered} width={width} onClick={(event) => event.stopPropagation()}>
          {children}
        </Content>
      </Root>
    )
  }
)

Modal.displayName = 'Modal'

const modalPropTypes = {
  children: PropTypes.node,
  hasMask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  centered: PropTypes.bool,
  width: PropTypes.number,
}

Modal.propTypes = modalPropTypes
type ModalProps = PropTypes.InferProps<typeof modalPropTypes>

export default Modal
