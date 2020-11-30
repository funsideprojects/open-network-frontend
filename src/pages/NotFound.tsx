import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import NotFoundContent from 'components/NotFound'

import * as Routes from 'routes'

const Container = styled.div`
  width: 100%;
  height: 200vh;
`

const NotFound = () => {
  const history = useHistory()

  return (
    <Container>
      <NotFoundContent navigate={() => history.push(Routes.HOME)} />
    </Container>
  )
}

export default NotFound
