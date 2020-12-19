import React from 'react'

import { Container, SubContainer, FixedContainer } from './Generic.styled'
import Stories from './Stories'
import Users from './Users'

import theme from 'theme'

const Component = () => {
  // ! Render nothing if screen size is smaller than threshold value
  if (window.innerWidth < parseInt(theme.screen.lg, 10)) {
    return null
  }

  return (
    <Container>
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
