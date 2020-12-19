import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from 'components/Form'
import Modal from 'components/Modal'
import { FlashMessage, FlashMessageType } from 'components/FlashMessage'

import * as Routes from 'routes'

const Title = styled.h2`
  margin: 0;
  text-align: center;
`

const Paragraph = styled.p`
  margin: ${(props) => props.theme.spacing.xxs} 0 0;
  font-size: 0.9rem;
  letter-spacing: ${(props) => props.theme.font.spacing.letter.sm};
  text-align: center;
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: ${(props) => props.theme.spacing.md} 0 0 0;

  button {
    background: ${(props) => props.theme.colors.success.main};

    &:hover {
      background: ${(props) => props.theme.colors.success.light};
    }
  }
`

const ModalFlashMessage = ({ modalRef, navigate }: ModalFlashMessageProps) => {
  return (
    <Modal hasMask maskClosable ref={modalRef} width={400}>
      <FlashMessage messageType={FlashMessageType.Success}>
        <Title>Congratulations</Title>
        <Paragraph>You have signed up successfully</Paragraph>
        <Footer>
          <Button buttonType="primary" onClick={() => (modalRef.current?.close(), navigate(Routes.SIGN_IN))}>
            Sign in now
          </Button>
        </Footer>
      </FlashMessage>
    </Modal>
  )
}

const modalFlashMessagePropTypes = {
  modalRef: PropTypes.any.isRequired,
  navigate: PropTypes.func.isRequired,
}

ModalFlashMessage.propTypes = modalFlashMessagePropTypes
type ModalFlashMessageProps = PropTypes.InferProps<typeof modalFlashMessagePropTypes>

export default React.memo(ModalFlashMessage)
