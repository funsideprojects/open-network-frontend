import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import { Button } from 'components/Form/index'

import * as Routes from 'routes'

import { Drawer, SCILeftArrowAlt, Title, PrimaryText, Hint } from './Generic.styled'
import SignUpForm from './SignUpForm'

// ? Transition config
const tDuration = 300 // ? ms
const defaultStyle = {
  transition: `${tDuration}ms`,
}
const transitionStyles = {
  entering: { opacity: 0, left: '-40%' },
  entered: { opacity: 1, left: 0 },
  exiting: { opacity: 0, left: '-40%' },
}

type RouteState = { from?: string }

const SignUpDrawer = ({ refetchAuthUser }: SignUpDrawerProps) => {
  const history = useHistory<RouteState>()

  const [nextDest, setNextDest] = React.useState(Routes.SIGN_IN)
  const [isMounted, setIsMounted] = React.useState(true)

  const handleSetNextDest = React.useCallback((dest: string) => {
    setNextDest(dest)
    setIsMounted(false)
  }, [])

  return (
    <Transition
      appear
      unmountOnExit
      in={isMounted}
      timeout={{ enter: 0, exit: tDuration }}
      onExited={() => history.push(nextDest, { from: history.location.pathname })}
    >
      {(transitionState) => {
        return (
          <Drawer
            fullHeight
            data-name="sign-in-drawer"
            float="left"
            style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
          >
            <Button
              buttonType="default"
              icon={SCILeftArrowAlt}
              onClick={() => handleSetNextDest(history.location.state?.from ?? Routes.HOME)}
            />

            <Title>
              <PrimaryText>Sign up</PrimaryText> to get in touch with your community
            </Title>

            <SignUpForm refetchAuthUser={refetchAuthUser} navigate={handleSetNextDest} />

            <Hint align="right">
              Already have an account?{' '}
              <PrimaryText onClick={() => handleSetNextDest(Routes.SIGN_IN)}>Sign in</PrimaryText>
            </Hint>
          </Drawer>
        )
      }}
    </Transition>
  )
}

const signUpDrawerProps = {
  refetchAuthUser: PropTypes.func.isRequired,
}

SignUpDrawer.propTypes = signUpDrawerProps
type SignUpDrawerProps = PropTypes.InferProps<typeof signUpDrawerProps>

export default SignUpDrawer
