import React from 'react'
import { useRecoilValue } from 'recoil'
import { NavLink, generatePath } from 'react-router-dom'

import { LoadingIndicator } from 'components/Loading'
import Avatar from 'components/Avatar'
import { authAtoms } from 'store'

import * as Routes from 'routes'

const AuthUserAvatar = () => {
  const { user } = useRecoilValue(authAtoms.userState)

  if (!user) {
    return (
      <NavLink to={Routes.HOME}>
        <LoadingIndicator />
      </NavLink>
    )
  }

  return (
    <NavLink to={generatePath(Routes.USER_PROFILE_PATH, { username: user.username })}>
      <Avatar size="100%" image={user.image} username={user.username} online={user.online} />
    </NavLink>
  )
}

export default AuthUserAvatar
