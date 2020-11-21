import React from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import { A, P, H1 } from 'components/Text'
import { NotFoundIcon } from 'components/icons'

import * as Routes from 'routes'

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  position: relative;
  background-color: ${(props) => props.theme.colors.grey[200]};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.xxl};
  text-align: center;
`

const Text = styled(P)`
  margin: ${(props) => props.theme.spacing.xs} 0 ${(props) => props.theme.spacing.md};
`

const Button = styled(A)`
  border-radius: ${(props) => props.theme.radius.md};
  margin-top: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.xxs} ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.colors.primary.lighter};

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.primary.light};
  }
`

// ? Transition config
const tDuration = 1000 // ? ms
const defaultStyle = {
  transition: `${tDuration}ms ease-out`,
}
const transitionStyles = {
  entering: { opacity: 0, clipPath: 'circle(0% at 100% 0)' },
  entered: { opacity: 1, clipPath: 'circle(150% at 100% 0)' },
  exiting: { opacity: 0, clipPath: 'circle(0% at 100% 0)' },
}

const NotFound = () => {
  return (
    <Transition
      appear
      unmountOnExit
      in={true}
      timeout={{
        enter: 0,
        exit: tDuration,
      }}
    >
      {(transitionState) => (
        <Background style={{ ...defaultStyle, ...transitionStyles[transitionState] }}>
          <Container>
            <H1>Oops!</H1>
            <Text>We can't seem to find the page you're looking for.</Text>

            <NotFoundIcon />

            <Button to={Routes.HOME}>Go back to Home Page</Button>
          </Container>
        </Background>
      )}
    </Transition>
  )
}

export default NotFound
