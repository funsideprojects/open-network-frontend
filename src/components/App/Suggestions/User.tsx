import React from 'react'
import styled from 'styled-components'

import Avatar from 'components/Avatar'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const Item = styled.div``

export const User = () => {
  return (
    <Container>
      <Avatar
        size="40px"
        // image="https://picsum.photos/30/30"
        username="xxxx"
        story
      />
    </Container>
  )
}

export default User
