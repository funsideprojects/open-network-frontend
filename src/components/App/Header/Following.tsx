import React from 'react'
import { People } from '@styled-icons/ionicons-outline/People'

import * as Routes from 'routes'

import { Link } from './Generic.styled'

const Following = () => {
  return (
    <Link to={Routes.NOTIFICATIONS} activeClassName="is-active" badge={0}>
      <People />
    </Link>
  )
}

export default Following
