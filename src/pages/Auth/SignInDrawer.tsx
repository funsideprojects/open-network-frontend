import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import { Button } from 'components/Form/index'

import * as Routes from 'routes'

import { Drawer, SCILeftArrowAlt, Title, PrimaryText, AuthHint } from './SignIn.styled'
import SignInForm from './SignInForm'

// ? Transition config
const tDuration = 300 // ? ms
const defaultStyle = {
  transition: `${tDuration}ms`,
}
const transitionStyles = {
  entering: { opacity: 0, right: '-40%' },
  entered: { opacity: 1, right: 0 },
  exiting: { opacity: 0, right: '-40%' },
}

const SignInDrawer = ({ refetchAuthUser }: SignInDrawerProps) => {
  const history = useHistory()

  const [nextDest, setNextDest] = React.useState(Routes.SIGN_IN)
  const [isMounted, setIsMounted] = React.useState(true)

  const handleSetNextDest = (dest: string) => {
    setNextDest(dest)
    setIsMounted(false)
  }

  return (
    <Transition appear in={isMounted} timeout={{ enter: 0, exit: tDuration }} onExited={() => history.push(nextDest)}>
      {(transitionState) => (
        <Drawer data-name="sign-in-drawer" style={{ ...defaultStyle, ...transitionStyles[transitionState] }}>
          <Button buttonType="default" onClick={() => handleSetNextDest(Routes.HOME)}>
            <SCILeftArrowAlt />
          </Button>

          <Title>
            <PrimaryText>Sign in</PrimaryText> to get in touch with your community
          </Title>

          <SignInForm refetchAuthUser={refetchAuthUser} />
          <AuthHint>
            Don't have an account? <PrimaryText onClick={() => handleSetNextDest(Routes.SIGN_UP)}>Sign up</PrimaryText>
          </AuthHint>
        </Drawer>
      )}
    </Transition>
  )
}

const signInDrawerProps = {
  refetchAuthUser: PropTypes.func.isRequired,
}

SignInDrawer.propTypes = signInDrawerProps
type SignInDrawerProps = PropTypes.InferProps<typeof signInDrawerProps>

export default SignInDrawer
