import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { NavLink, generatePath } from 'react-router-dom'

import { LoadingIndicator } from 'components/Loading'
import Avatar from 'components/Avatar'
import { authAtoms } from 'store'

import * as Routes from 'routes'

const Link = styled(NavLink)`
  border: 2px dashed transparent;
  border-radius: 100%;
  transition: 0.3s;

  &.is-active {
    border-color: ${(props) => props.theme.colors.primary.light};
  }
`

const AuthUserAvatar = () => {
  const { user } = useRecoilValue(authAtoms.userState)

  return (
    <Link
      to={user ? generatePath(Routes.USER_PROFILE_PATH, { username: user.username }) : Routes.HOME}
      activeClassName="is-active"
    >
      {user ? (
        <Avatar size="100%" image={user.image} username={user.username} online={user.online} />
      ) : (
        <LoadingIndicator />
      )}
    </Link>
  )
}

export default AuthUserAvatar
