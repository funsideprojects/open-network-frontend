import React from 'react'

import { Button } from 'components/Form/index'

import { Section, Title, PrimaryText, IntroParagraphs, Nav } from './Welcome.styled'

const WelcomeSection = () => {
  return (
    <Section data-name="welcome-section">
      <Title>
        Find your community at <PrimaryText>PrJx</PrimaryText>
      </Title>

      <IntroParagraphs>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet sem at est semper, et congue nunc
        semper. Cras orci dolor, maximus vel enim in, aliquet fermentum orci. Vestibulum tincidunt odio sed ante
        pellentesque, in pellentesque ante sodales. Praesent porta leo vel ultrices condimentum. Nunc vel malesuada
        urna. Quisque maximus ipsum at risus placerat, et commodo turpis placerat.
      </IntroParagraphs>

      <Nav>
        <Button buttonType="default" bordered>
          SIGN UP
        </Button>

        <Button buttonType="primary">SIGN IN</Button>
      </Nav>
    </Section>
  )
}

export default WelcomeSection
