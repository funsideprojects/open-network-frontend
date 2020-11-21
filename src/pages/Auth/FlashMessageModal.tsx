import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/Form'
import Modal from 'components/Modal'
import { FlashMessage, FlashMessageType } from 'components/FlashMessage'

import * as Routes from 'routes'

import { Title, Paragraph, Footer } from './FlashMessageModal.styled'

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
