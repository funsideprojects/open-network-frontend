import React from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import Head from 'components/Head'
import { Button } from 'components/Form'

import * as Routes from 'routes'

import { Drawer, Title, PrimaryText, Paragraphs } from './Generic.styled'
import { Nav } from './Welcome.styled'

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

const WelcomeDrawer = () => {
  const history = useHistory()

  const [nextDest, setNextDest] = React.useState(Routes.HOME)
  const [isMounted, setIsMounted] = React.useState(true)

  const handleSetNextDest = (dest: string) => {
    setNextDest(dest)
    setIsMounted(false)
  }

  return (
    <>
      <Head />

      <Transition
        appear
        unmountOnExit
        in={isMounted}
        timeout={{ enter: 0, exit: tDuration }}
        onExited={() => history.push(nextDest, { from: history.location.pathname })}
      >
        {(transitionState) => (
          <Drawer
            data-name="welcome-drawer"
            float="left"
            style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
          >
            <Title noMarginTop>
              Find your community at <PrimaryText>PrJx</PrimaryText>
            </Title>

            <Paragraphs>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet sem at est semper, et congue nunc
              semper. Cras orci dolor, maximus vel enim in, aliquet fermentum orci. Vestibulum tincidunt odio sed ante
              pellentesque, in pellentesque ante sodales. Praesent porta leo vel ultrices condimentum.
            </Paragraphs>

            <Nav>
              <Button buttonType="primary" onClick={() => handleSetNextDest(Routes.SIGN_UP)}>
                SIGN UP
              </Button>

              <Button buttonType="default" onClick={() => handleSetNextDest(Routes.SIGN_IN)}>
                SIGN IN
              </Button>
            </Nav>
          </Drawer>
        )}
      </Transition>
    </>
  )
}

export default WelcomeDrawer
