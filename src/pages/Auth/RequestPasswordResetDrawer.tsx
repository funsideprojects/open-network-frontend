import React from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import Head from 'components/Head'
import { Button } from 'components/Form'

import * as Routes from 'routes'

import { Drawer } from './Generic.styled'
import { Title, Paragraphs, SCIArrowBack } from './Generic.styled'

import RequestPasswordResetForm from './RequestPasswordResetForm'

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

type RouteState = { from?: string }

const RequestPasswordResetDrawer = () => {
  const history = useHistory<RouteState>()

  const [nextDest, setNextDest] = React.useState(Routes.HOME)
  const [isMounted, setIsMounted] = React.useState(true)

  const handleSetNextDest = (dest: string) => {
    setNextDest(dest)
    setIsMounted(false)
  }

  return (
    <>
      <Head title="PrJx - Request Password Reset" />

      <Transition
        appear
        unmountOnExit
        in={isMounted}
        timeout={{ enter: 0, exit: tDuration }}
        onExited={() => history.push(nextDest, { from: history.location.pathname })}
      >
        {(transitionState) => (
          <Drawer
            data-name="request-password-reset-drawer"
            float="left"
            style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
          >
            <Button
              buttonType="default"
              icon={SCIArrowBack}
              onClick={() => handleSetNextDest(history.location.state?.from ?? Routes.SIGN_IN)}
            />

            <Title>Forgot your password?</Title>

            <Paragraphs noMargin>
              Please enter your username or email address. <br />
              We'll email instructions on how to reset your password
            </Paragraphs>

            <RequestPasswordResetForm />
          </Drawer>
        )}
      </Transition>
    </>
  )
}

export default RequestPasswordResetDrawer
