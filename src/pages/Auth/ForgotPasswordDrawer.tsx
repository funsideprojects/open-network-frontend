import React from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import { Button } from 'components/Form/index'

import * as Routes from 'routes'

import { Drawer } from './Generic.styled'
import { Title, Paragraphs, SCILeftArrowAlt } from './Generic.styled'

import ForgotPasswordForm from './ForgotPasswordForm'

// ? Transition config
const tDuration = 300 // ? ms
const defaultStyle = {
  transition: `${tDuration}ms`,
}
const transitionStyles = {
  entering: { opacity: 0, left: '-45%' },
  entered: { opacity: 1, left: 0 },
  exiting: { opacity: 0, left: '-45%' },
}

const ForgotPasswordDrawer = () => {
  const history = useHistory<{ from?: string }>()

  const [nextDest, setNextDest] = React.useState(Routes.HOME)
  const [isMounted, setIsMounted] = React.useState(true)

  const handleSetNextDest = (dest: string) => {
    setNextDest(dest)
    setIsMounted(false)
  }

  return (
    <Transition
      appear
      unmountOnExit
      in={isMounted}
      timeout={{
        enter: 0,
        exit: tDuration,
      }}
      onExited={() => history.push(nextDest, { from: history.location.pathname })}
    >
      {(transitionState) => (
        <Drawer
          data-name="forgot-password-drawer"
          float="left"
          style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
        >
          <Button
            buttonType="default"
            onClick={() => handleSetNextDest(history.location.state?.from ?? Routes.SIGN_IN)}
          >
            <SCILeftArrowAlt />
          </Button>

          <Title>Forgot your password?</Title>

          <Paragraphs noMargin>
            Please enter your username or email address. <br />
            We'll email instructions on how to reset your password
          </Paragraphs>

          <ForgotPasswordForm />
        </Drawer>
      )}
    </Transition>
  )
}

export default ForgotPasswordDrawer
