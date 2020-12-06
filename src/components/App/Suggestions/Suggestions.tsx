import React from 'react'

import { Container, SubContainer, FixedContainer } from './Generic.styled'
import Stories from './Stories'

import theme from 'theme'

const Suggestions = () => {
  // ? Do not render content to prevent queries on didmount
  if (window.innerWidth < parseInt(theme.screen.lg, 10)) {
    return null
  }

  return (
    <Container>
      <SubContainer>
        <FixedContainer>
          <Stories />
        </FixedContainer>
      </SubContainer>
    </Container>
  )
}

export default Suggestions
