import React from 'react'
import { useLocation, matchPath } from 'react-router-dom'

import { Container, SubContainer, FixedContainer } from './Generic.styled'
import Stories from './Stories'
import Users from './Users'

import * as Routes from 'routes'
import theme from 'theme'

const Component = () => {
  const { pathname } = useLocation()

  // ? Hide this section if screen size is smaller than threshold value
  if (window.innerWidth < parseInt(theme.screen.lg, 10)) {
    return <React.Fragment />
  }

  // ? Hide this section for some specified routes
  const shouldHide = [Routes.USER_PROFILE_PATH].some((path) => matchPath(pathname, { path, exact: true, strict: true }))

  return (
    <Container visible={!shouldHide}>
      <SubContainer>
        <FixedContainer>
          <Stories />
          <Users />
        </FixedContainer>
      </SubContainer>
    </Container>
  )
}

export default Component
