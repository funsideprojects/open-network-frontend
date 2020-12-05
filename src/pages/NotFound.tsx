import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import Head from 'components/Head'
import NotFoundContent from 'components/NotFound'

import * as Routes from 'routes'

const Container = styled.div`
  width: 100%;
  height: 200vh;
  transition: 0.3s;
`

const NotFound = () => {
  const history = useHistory()

  return (
    <>
      <Head title="Page Not Found" />

      <Container>
        <NotFoundContent navigate={() => history.push(Routes.HOME)} />
      </Container>
    </>
  )
}

export default NotFound
