import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { P, H1 } from 'components/Text'
import { NotFoundIcon } from 'components/icons'
import { Button } from 'components/Form'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Text = styled(P)`
  margin: ${(props) => props.theme.spacing.xs} 0 ${(props) => props.theme.spacing.md};
`

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing.md};
`

const NotFound = ({ navigate }: NotFoundProps) => (
  <Container>
    <H1>Oops!</H1>
    <Text>We can't seem to find the page you're looking for.</Text>
    <NotFoundIcon />
    <StyledButton onClick={navigate}>Go back to Home Page</StyledButton>
  </Container>
)

const notFoundPropTypes = {
  navigate: PropTypes.func.isRequired,
}

NotFound.propTypes = notFoundPropTypes
type NotFoundProps = PropTypes.InferProps<typeof notFoundPropTypes>

export default NotFound
