import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
// import { Link, generatePath } from 'react-router-dom'
import { Query } from 'react-apollo'
import { useSubscription } from '@apollo/react-hooks'

import { GET_FOLLOWED_USERS_COUNT, GET_USER_FOLLOWERS } from 'graphql/follow'
import { GET_USER_POSTS_COUNT } from 'graphql/post'
import { IS_USER_ONLINE_SUBSCRIPTION } from 'graphql/user'

import AnimatedCount from 'components/AnimatedCount'
import { H1 } from 'components/Text'
import { Spacing } from 'components/Layout'
import Follow from 'components/Follow'
import ProfileImageUpload from './ProfileImageUpload'
import ProfileCoverUpload from './ProfileCoverUpload'

import { useStore } from 'store'
import { OPEN_FOLLOW_DRAWER } from 'store/follow'

// import * as Routes from 'routes'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -140px;
`

const FullName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${(p) => p.theme.spacing.sm};
  position: relative;

  ${H1} {
    font-size: ${(p) => p.theme.font.size.lg};
  }

  @media (min-width: ${(p) => p.theme.screen.md}) {
    ${H1} {
      font-size: ${(p) => p.theme.font.size.xl};
    }
  }
`

const FollowAndMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${(p) => p.theme.spacing.sm};
`

// const Message = styled(Link)`
//   text-decoration: none;
//   font-size: ${(p) => p.theme.font.size.xs};
// `

const glow = keyframes`
  0% {
    box-shadow: 0 0 0 1px #95de64;
  }
  100% {
    box-shadow: 0 0 0 7px #f6ffed;
  }
`

const Online = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(p) => p.theme.colors.success};
  margin-left: ${(p) => p.theme.spacing.sm};
  border-radius: 50%;
  animation: 1.5s ${glow} infinite ease-in-out;
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: ${(p) => p.theme.font.size.xs};
  margin-top: ${(p) => p.theme.spacing.sm};
`

const List = styled.div`
  padding: 0 ${(p) => p.theme.spacing.xs};
  color: ${(p) => p.theme.colors.grey[800]};
  white-space: nowrap;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    padding: 0 ${(p) => p.theme.spacing.lg};
  }
`

const Count = styled.span`
  user-select: none;
  border-bottom: 1px solid transparent;
  transition: all 0.4s ease-in;
  ${(p) => (p.clickable ? `&:hover { cursor: pointer; border-color: black }` : '')}

  &:after {
    content: ' ${(p) => p.text}';
  }
`

/**
 * Renders user information in profile page
 */
const ProfileInfo = ({ user, getUserPosts = false }) => {
  const [{ auth, follow }, dispatch] = useStore()
  const [isUserOnline, setIsUserOnline] = useState(user.isOnline)

  const { data, loading } = useSubscription(IS_USER_ONLINE_SUBSCRIPTION, {
    variables: { userId: user.id },
  })

  if (!loading && data) {
    if (data.isUserOnline.isOnline !== isUserOnline) setIsUserOnline(data.isUserOnline.isOnline)
  }

  return (
    <Root>
      <ProfileCoverUpload username={user.username} userId={user.id} coverImage={user.coverImage} />

      <ProfileImage>
        <ProfileImageUpload username={user.username} userId={user.id} image={user.image} getUserPosts={getUserPosts} />

        <FullName>
          <H1>{user.fullName}</H1>

          {isUserOnline && <Online />}

          {auth.user.id !== user.id && (
            <FollowAndMessage>
              <Follow user={user} />

              <Spacing left='sm' />
              {/* <Message to={generatePath(Routes.MESSAGES, { userId: user.id })}>Message</Message> */}
            </FollowAndMessage>
          )}
        </FullName>
      </ProfileImage>

      <Info>
        <List>
          <Query query={GET_USER_POSTS_COUNT} fetchPolicy='no-cache' variables={{ username: user.username }}>
            {({ data, loading, error }) => {
              if (loading) return 'loading'
              if (error || !data) return 'error'

              return (
                <Count text='posts'>
                  <b>
                    <AnimatedCount to={data.getPosts.count} />
                  </b>
                </Count>
              )
            }}
          </Query>
        </List>
        <List>
          <Query query={GET_USER_FOLLOWERS} fetchPolicy='no-cache' variables={{ username: user.username }}>
            {({ data, loading, error }) => {
              if (loading) return 'loading'
              if (error || !data) return 'error'

              return (
                <Count text='followers'>
                  <b>
                    <AnimatedCount to={data.getUserFollowers.count} />
                  </b>
                </Count>
              )
            }}
          </Query>
        </List>
        <List>
          {auth.user.id === user.id ? (
            <Count text='following' clickable onClick={() => dispatch({ type: OPEN_FOLLOW_DRAWER })}>
              <b>
                <AnimatedCount to={follow.followed.count} />
              </b>
            </Count>
          ) : (
            <Query query={GET_FOLLOWED_USERS_COUNT} fetchPolicy='no-cache' variables={{ username: user.username }}>
              {({ data, loading, error }) => {
                if (loading) return 'loading'
                if (error || !data) return 'error'

                return (
                  <Count text='following'>
                    <b>
                      <AnimatedCount to={data.getFollowedUsers.count} />
                    </b>
                  </Count>
                )
              }}
            </Query>
          )}
        </List>
      </Info>
    </Root>
  )
}

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,

  getUserPosts: PropTypes.bool,
}

export default ProfileInfo
