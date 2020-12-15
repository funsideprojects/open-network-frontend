import React from 'react'
import { NetworkStatus, useLazyQuery } from '@apollo/client'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { People } from '@styled-icons/ionicons-outline/People'

import { LoadingIndicator } from 'components/Loading'
import { GET_FOLLOWING_IDS } from 'graphql/follow'
import { authAtoms, followAtoms } from 'store'

import * as Routes from 'routes'

import { Link } from './Generic.styled'

const Component = () => {
  const { user } = useRecoilValue(authAtoms.userState)
  const setFollowingIds = useSetRecoilState(followAtoms.followingIdsState)
  const [getFollowings, { networkStatus, called }] = useLazyQuery(GET_FOLLOWING_IDS.gql, {
    displayName: GET_FOLLOWING_IDS.name,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data?.getFollowings?.users) {
        setFollowingIds(data.getFollowings.users.map(({ id }) => id))
      }
    },
  })

  React.useEffect(() => {
    // ? Only execute query if there's authUser in store AND the query has not been called before
    // ! This prevent query get called multiple time when authUser get updated
    if (user && !called) {
      getFollowings({ variables: { input: { username: user.username, idOnly: true } } })
    }
  }, [called, user, getFollowings])

  return (
    <Link
      to={Routes.NOTIFICATIONS}
      activeClassName="is-active"
      onClick={(event) => {
        if (networkStatus !== NetworkStatus.ready) {
          event.preventDefault()
        }
      }}
    >
      {networkStatus === NetworkStatus.ready ? <People /> : <LoadingIndicator />}
    </Link>
  )
}

export default Component
