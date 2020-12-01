import React from 'react'
import { Notifications } from '@styled-icons/ionicons-outline/Notifications'

import * as Routes from 'routes'

import { Link } from './Header.styled'

const Notification = () => {
  return (
    <Link to={Routes.NOTIFICATIONS} activeClassName="is-active" count={1001}>
      <Notifications />
    </Link>
  )
}

export default Notification
