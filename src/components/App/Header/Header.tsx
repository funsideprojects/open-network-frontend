import React from 'react'
import styled from 'styled-components'
import { LogOut } from '@styled-icons/ionicons-outline'

import Search from 'components/Search'
import MusicPlayer from 'components/MusicPlayer'
import { Button } from 'components/Form'
import { useScrollPosition } from 'hooks/useScrollPosition'

import { Container, HeaderItems } from './Header.styled'
import Following from './Following'
import Notification from './Notification'
import Messaging from './Messaging'
import Username from './Username'

const SCILogOut = styled(LogOut)``

const Header = () => {
  const [rising, setRising] = React.useState(false)

  useScrollPosition({
    useWindow: true,
    effect: ({ currentPosition }) => {
      if (currentPosition.y > 60 && !rising) {
        setRising(true)
      } else if (currentPosition.y < 60 && rising) {
        setRising(false)
      }
    },
    waitMs: 200,
  })

  const buttonRef = React.useRef(null)

  return (
    <Container rising={rising}>
      <HeaderItems side="start">
        <Search />
      </HeaderItems>

      <HeaderItems side="center">
        <MusicPlayer />
      </HeaderItems>

      <HeaderItems side="end">
        <Following />
        <Notification />
        <Messaging />
        <Username />
        <Button ref={buttonRef} buttonType="primary" icon={SCILogOut} />
      </HeaderItems>
    </Container>
  )
}

export default Header
