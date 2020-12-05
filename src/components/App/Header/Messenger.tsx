import React from 'react'
import { Chatbubbles } from '@styled-icons/ionicons-outline/Chatbubbles'

import * as Routes from 'routes'

import { Link } from './Generic.styled'

const Messenger = () => {
  return (
    <Link to={Routes.NOTIFICATIONS} activeClassName="is-active" badge={1}>
      <Chatbubbles />
    </Link>
  )
}

export default Messenger
