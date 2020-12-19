import React from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import Head from 'components/Head'
import { Button } from 'components/Form'

import * as Routes from 'routes'

import { Drawer, SCIArrowBack, Title, PrimaryText, Hint } from './Generic.styled'
import SignInForm from './SignInForm'

// ? Transition config
const tDuration = 300 // ? ms
const defaultStyle = {
  transition: `${tDuration}ms`,
}
const transitionStyles = {
  entering: { opacity: 0, right: '-40%', visibility: 'hidden' },
  entered: { opacity: 1, right: 0, visibility: 'visible' },
  exiting: { opacity: 0, right: '-40%', visibility: 'hidden' },
}

type RouteState = { from?: string }

const SignInDrawer = () => {
  const history = useHistory<RouteState>()

  const [nextDest, setNextDest] = React.useState(Routes.HOME)
  const [isMounted, setIsMounted] = React.useState(true)

  const handleSetNextDest = (dest: string) => {
    setNextDest(dest)
    setIsMounted(false)
  }

  return (
    <>
      <Head title="PrJx - Sign In" />

      <Transition
        appear
        unmountOnExit
        in={isMounted}
        timeout={{ enter: 0, exit: tDuration }}
        onExited={() => history.push(nextDest, { from: history.location.pathname })}
      >
        {(transitionState) => (
          <Drawer
            fullHeight
            data-name="sign-in-drawer"
            float="right"
            style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
          >
            <Button buttonType="default" onClick={() => handleSetNextDest(history.location.state?.from ?? Routes.HOME)}>
              <SCIArrowBack />
            </Button>

            <Title>
              <PrimaryText>Sign in</PrimaryText> to get in touch with your community
            </Title>

            {transitionState === 'entered' || transitionState === 'exiting' ? (
              <SignInForm navigate={handleSetNextDest} />
            ) : (
              <></>
            )}

            <Hint align="right">
              Don't have an account?{' '}
              <PrimaryText onClick={() => handleSetNextDest(Routes.SIGN_UP)}>Sign up</PrimaryText>
            </Hint>
          </Drawer>
        )}
      </Transition>
    </>
  )
}

export default SignInDrawer
