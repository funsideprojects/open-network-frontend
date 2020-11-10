import React from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import { Button } from 'components/Form/index'

import * as Routes from 'routes'

import { Drawer, PrimaryText, Paragraphs } from './Generic.styled'
import { Title, Nav, SCILeftArrowAlt, SCIRightArrowAlt } from './Welcome.styled'

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
          data-name="welcome-drawer"
          float="left"
          style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
        >
          <Title>
            Find your community at <PrimaryText>PrJx</PrimaryText>
          </Title>

          <Paragraphs>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet sem at est semper, et congue nunc
            semper. Cras orci dolor, maximus vel enim in, aliquet fermentum orci. Vestibulum tincidunt odio sed ante
            pellentesque, in pellentesque ante sodales. Praesent porta leo vel ultrices condimentum. Nunc vel malesuada
            urna. Quisque maximus ipsum at risus placerat, et commodo turpis placerat.
          </Paragraphs>

          <Nav>
            <Button buttonType="primary" onClick={() => handleSetNextDest(Routes.SIGN_UP)}>
              <SCILeftArrowAlt /> SIGN UP
            </Button>

            <Button bordered buttonType="default" onClick={() => handleSetNextDest(Routes.SIGN_IN)}>
              SIGN IN <SCIRightArrowAlt />
            </Button>
          </Nav>
        </Drawer>
      )}
    </Transition>
  )
}

export default WelcomeDrawer
