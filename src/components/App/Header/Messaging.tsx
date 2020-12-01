import React from 'react'
import { Chatbubbles } from '@styled-icons/ionicons-outline/Chatbubbles'

import * as Routes from 'routes'

import { Link } from './Header.styled'

const Notification = () => {
  return (
    <Link to={Routes.NOTIFICATIONS} activeClassName="is-active" count={0}>
      <Chatbubbles />
    </Link>
  )
}

export default Notification
