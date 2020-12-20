import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { useSubscription } from '@apollo/client'

// import { GET_FOLLOWED_USERS_COUNT, GET_USER_FOLLOWERS } from 'graphql/follow'
// import { GET_USER_POSTS_COUNT } from 'graphql/post'
// import { IS_USER_ONLINE_SUBSCRIPTION } from 'graphql/user'

// import * as Routes from 'routes'

// const ProfileImage = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: -140px;
// `

const Component = ({ user }: Props) => {
  // const [isUserOnline, setIsUserOnline] = useState(user.isOnline)

  // const { data, loading } = useSubscription(IS_USER_ONLINE_SUBSCRIPTION, {
  //   variables: { userId: user.id },
  // })

  // if (!loading && data) {
  //   if (data.isUserOnline.isOnline !== isUserOnline) setIsUserOnline(data.isUserOnline.isOnline)
  // }

  return (
    <React.Fragment>
      {/*
      <ProfileImage>
        <ProfileImageUpload username={user.username} userId={user.id} image={user.image} getUserPosts={getUserPosts} />

        <FullName>
          <H1>{user.fullName}</H1>

          {isUserOnline && <Online />}

          {auth.user.id !== user.id && (
            <FollowAndMessage>
              <Follow user={user} />

              <Spacing left="sm" />
            </FollowAndMessage>
          )}
        </FullName>
      </ProfileImage> */}
    </React.Fragment>
  )
}

const componentPropTypes = {
  user: PropTypes.any,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Component
