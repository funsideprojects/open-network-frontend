import React from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import Head from 'components/Head'
import { Button } from 'components/Form'

import * as Routes from 'routes'

import { Drawer, SCIHomeAlt } from './Generic.styled'
import ResetPasswordForm from './ResetPasswordForm'

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

const ResetPasswordDrawer = () => {
  const history = useHistory<RouteState>()

  const [nextDest, setNextDest] = React.useState(Routes.HOME)
  const [isMounted, setIsMounted] = React.useState(true)

  const handleSetNextDest = (dest: string) => {
    setNextDest(dest)
    setIsMounted(false)
  }

  return (
    <>
      <Head title="PrJx - Reset Password" />

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
            data-name="reset-password-drawer"
            float="left"
            style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
          >
            <Button buttonType="default" onClick={() => handleSetNextDest(history.location.state?.from ?? Routes.HOME)}>
              <SCIHomeAlt />
            </Button>

            {transitionState === 'entered' ? <ResetPasswordForm navigate={handleSetNextDest} /> : <></>}
          </Drawer>
        )}
      </Transition>
    </>
  )
}

export default ResetPasswordDrawer
