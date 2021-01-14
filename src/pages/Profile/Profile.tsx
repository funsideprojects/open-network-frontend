import React from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'

import Head from 'components/Head'
import NotFound from 'components/NotFound'
// import ProfileInfo from './ProfileInfo'
// import CreatePost from 'components/CreatePost'
// import ProfilePosts from './ProfilePosts'
// import NotFound from 'components/NotFound'

import { GET_USER, UPDATE_USER_INFO } from 'graphql/user'
import { authAtoms } from 'store'

import Placeholder from './Placeholder'
import Cover from './Cover'
import Avatar from './Avatar'
import Names from './Names'
import StatusQuote from './StatusQuote'
import Information from './Information'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

type RouteParams = { username?: string }

const Component = () => {
  const [{ user }, setAuthUser] = useRecoilState(authAtoms.userState)
  const { username } = useParams<RouteParams>()
  const [getUser, { loading, data: userData, error }] = useLazyQuery(GET_USER.gql, {
    fetchPolicy: 'network-only',
  })
  const [updateUserInfo, { data: updatedUserData }] = useMutation(UPDATE_USER_INFO, {
    notifyOnNetworkStatusChange: false,
  })

  const handleUpdateUserInfo = (changes = {}) => {
    return updateUserInfo({
      variables: {
        input: {
          email: user.email,
          fullName: user.fullName,
          statusQuote: user.statusQuote,
          visibleToEveryone: user.visibleToEveryone,
          displayOnlineStatus: user.displayOnlineStatus,
          ...changes,
        },
      },
    })
  }

  React.useEffect(() => {
    // ? Trigger query if username from params is not authUser
    if (user && username && username !== user.username) {
      getUser({ variables: { username } })
    }
  }, [user, username, getUser])

  // ? Update authUser object
  React.useEffect(() => {
    if (updatedUserData?.updateUserInfo) {
      setAuthUser({ user: updatedUserData.updateUserInfo })
    }
  }, [updatedUserData, setAuthUser])

  // ? Placeholder
  if (!username || !user || (username !== user.username && !userData) || loading || error) {
    return (
      <React.Fragment>
        <Head />
        {error ? <NotFound message={error.message} /> : <Placeholder />}
      </React.Fragment>
    )
  }

  const isAuthUser = username === user.username
  const userObject = isAuthUser ? user : userData.getUser
  const documentTitle = isAuthUser
    ? `${user.fullName} (@${username})`
    : userData.getUser.fullName
    ? `${userData.getUser.fullName} (@${username})`
    : username

  return (
    <React.Fragment>
      <Head title={documentTitle} />

      <Container>
        <Cover isAuthUser={isAuthUser} coverImage={userObject.coverImage} />
        <Avatar isAuthUser={isAuthUser} image={userObject.image} />
        <Names
          isAuthUser={isAuthUser}
          username={userObject.username}
          fullName={userObject.fullName}
          updateUserInfo={handleUpdateUserInfo}
        />
        <StatusQuote
          isAuthUser={isAuthUser}
          statusQuote={userObject.statusQuote}
          updateUserInfo={handleUpdateUserInfo}
        />

        <Information />
      </Container>
    </React.Fragment>
  )
}

export default Component
