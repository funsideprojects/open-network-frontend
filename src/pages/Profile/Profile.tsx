import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

import Head from 'components/Head'
import NotFound from 'components/NotFound'
// import ProfileInfo from './ProfileInfo'
// import CreatePost from 'components/CreatePost'
// import ProfilePosts from './ProfilePosts'
// import NotFound from 'components/NotFound'

import Placeholder from './Placeholder'
import Cover from './Cover'
import Avatar from './Avatar'
import Names from './Names'
import Information from './Information'

import { GET_USER } from 'graphql/user'
import { authAtoms } from 'store'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

type RouteParams = { username?: string }

const Component = () => {
  const { user } = useRecoilValue(authAtoms.userState)
  const { username } = useParams<RouteParams>()
  const [getUser, { loading, data, error }] = useLazyQuery(GET_USER.gql, {
    fetchPolicy: 'network-only',
  })

  React.useEffect(() => {
    // ? Trigger query if username from params is not authUser
    if (user && username && username !== user.username) {
      getUser({ variables: { username } })
    }
  }, [user, username, getUser])

  // ? Placeholder
  if (!username || !user || (username !== user.username && !data) || loading || error) {
    return (
      <React.Fragment>
        <Head />
        {error ? <NotFound message={error.message} /> : <Placeholder />}
      </React.Fragment>
    )
  }

  const isAuthUser = username === user.username
  const userObject = isAuthUser ? user : data.getUser
  const documentTitle = isAuthUser
    ? `${user.fullName} (@${username})`
    : data.getUser.fullName
    ? `${data.getUser.fullName} (@${username})`
    : username

  return (
    <React.Fragment>
      <Head title={documentTitle} />

      <Container>
        <Cover isAuthUser={isAuthUser} coverImage={userObject.coverImage} />
        <Avatar isAuthUser={isAuthUser} image={userObject.image} />
        <Names isAuthUser={isAuthUser} username={userObject.username} fullName={userObject.fullName} />
        <Information />
      </Container>
    </React.Fragment>
  )
}

export default Component
