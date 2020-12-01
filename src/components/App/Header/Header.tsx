import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Search from 'components/Search'
import { useScrollPosition } from 'hooks/useScrollPosition'

import Following from './Following'
import Notification from './Notification'
import Messaging from './Messaging'
import Username from './Username'

// import Avatar from 'components/Avatar'

const Container = styled.div<{ rising: boolean }>`
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20px 15px -20px ${(props) => (props.rising ? props.theme.colors.grey[400] : 'transparent')};
  padding: ${(props) => props.theme.spacing.sm};
  z-index: ${(props) => props.theme.zIndex.md};
  background-color: ${(props) => props.theme.colors.grey[props.rising ? 200 : 200]};
  transition: 0.3s;
`

const HeaderItems = styled.div<{ side: 'start' | 'center' | 'end' }>`
  position: relative;
  display: flex;
  justify-content: ${(props) => (props.side === 'center' ? 'center' : `flex-${props.side}`)};
  align-items: center;
`

const Header = (props: Props) => {
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

      <HeaderItems side="end">
        <Following />
        <Notification />
        <Messaging />
        <Username />
      </HeaderItems>
    </Container>
  )
}

const componentPropTypes = {
  toggleSideBar: PropTypes.func,
}

Header.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Header
