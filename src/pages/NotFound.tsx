import React from 'react'
import styled from 'styled-components'

import Head from 'components/Head'
import NotFoundContent from 'components/NotFound'

const Container = styled.div`
  width: 100%;
  height: 200vh;
  transition: 0.3s;
`

const NotFound = () => {
  return (
    <>
      <Head title="Page Not Found" />

      <Container>
        <NotFoundContent />
      </Container>
    </>
  )
}

export default NotFound
