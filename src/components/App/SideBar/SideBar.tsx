import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flame, Radio, Image, Play, Bookmark, Add } from '@styled-icons/ionicons-outline'

import * as Routes from 'routes'

import AuthUserAvatar from './AuthUserAvatar'
import { Container, Divider, Item } from './SideBar.styled'

const SideBar = () => {
  const items = [
    { to: Routes.HOME, component: <Flame /> },
    { to: Routes.NOTFOUND, component: <Radio /> },
    { to: Routes.HOME, component: <Image /> },
    'divider',
    { to: Routes.HOME, component: <Play /> },
    { to: Routes.HOME, component: <Bookmark /> },
    'divider',
    { to: Routes.HOME, component: <Add /> },
  ]

  return (
    <Container>
      <Item>
        <AuthUserAvatar />
      </Item>

      {items.map((item, index) =>
        typeof item === 'string' ? (
          <Divider key={index} />
        ) : (
          <Item key={index}>
            <NavLink exact strict to={item.to} activeClassName="is-active">
              {item.component}
            </NavLink>
          </Item>
        )
      )}
    </Container>
  )
}

export default SideBar
