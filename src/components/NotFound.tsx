import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { P, H1 } from 'components/Text'
import { NotFoundIcon } from 'components/icons'
import { Button } from 'components/Form'

import * as Routes from 'routes'

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

const defaultMessage = `We can't seem to find the page you're looking for`

const NotFound = ({ message = defaultMessage, navigate }: NotFoundProps) => {
  const history = useHistory()

  const defaultNavigate = () => history.push(Routes.HOME)

  return (
    <Container>
      <H1>Oops!</H1>
      <Text>{message}</Text>
      <NotFoundIcon />
      <StyledButton onClick={navigate ?? defaultNavigate}>Go back to Home Page</StyledButton>
    </Container>
  )
}

const notFoundPropTypes = {
  message: PropTypes.string,
  navigate: PropTypes.func,
}

NotFound.propTypes = notFoundPropTypes
type NotFoundProps = PropTypes.InferProps<typeof notFoundPropTypes>

export default NotFound
