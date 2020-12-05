import React from 'react'

import Search from 'components/Search'
import MusicPlayer from 'components/MusicPlayer'

import { useScrollPosition } from 'hooks/useScrollPosition'

import { Container, HeaderItems } from './Generic.styled'
import Following from './Following'
import Notification from './Notification'
import Messenger from './Messenger'
import Username from './Username'
import SignOut from './SignOut'

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
        <Messenger />
        <Username />
        <SignOut />
      </HeaderItems>
    </Container>
  )
}

export default Header
