import React from 'react'
import { useRecoilValue } from 'recoil'
import { generatePath } from 'react-router-dom'

import { authAtoms } from 'store'
import * as Routes from 'routes'

import { Link, Text } from './Generic.styled'

const Username = () => {
  const { user } = useRecoilValue(authAtoms.userState)

  if (!user) {
    return <React.Fragment />
  }

  return (
    <Link
      to={generatePath(Routes.USER_PROFILE_PATH, { username: user.username })}
      activeClassName="is-active"
      badge={0}
    >
      <Text>{user.fullName}</Text>
    </Link>
  )
}

export default Username
