import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flame } from '@styled-icons/ionicons-outline/Flame'
import { Planet } from '@styled-icons/ionicons-outline/Planet'
import { Image } from '@styled-icons/ionicons-outline/Image'
import { Play } from '@styled-icons/ionicons-outline/Play'
import { Bookmark } from '@styled-icons/ionicons-outline/Bookmark'
import { Add } from '@styled-icons/ionicons-outline/Add'

import * as Routes from 'routes'

import AuthUserAvatar from './AuthUserAvatar'
import { Container, Divider, Item } from './SideBar.styled'

const SideBar = () => {
  const items = [
    { to: Routes.HOME, component: <Flame /> },
    { to: Routes.NOTFOUND, component: <Planet /> },
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
