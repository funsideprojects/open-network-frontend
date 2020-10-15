import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'
import { withApollo } from 'react-apollo'

import { A } from 'components/Text'
import { Spacing } from 'components/Layout'
import Avatar from 'components/Avatar'

import { useClickOutside } from 'hooks/useClickOutside'

// import { GET_AUTH_USER } from 'graphql/user'
// import { UPDATE_NOTIFICATION_SEEN } from 'graphql/notification'

import { useStore } from 'store'

import * as Routes from 'routes'

const NotificationItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.spacing.xs};
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};
  font-size: ${(p) => p.theme.font.size.xxs};
  background-color: ${(p) => p.theme.colors.white};

  &:last-child {
    border-bottom: 0;
  }
`

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Name = styled.div`
  font-weight: ${(p) => p.theme.font.weight.bold};
`

const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: ${(p) => p.theme.spacing.xs};
`

// const PostImage = styled.div`
//   width: 40px;
//   height: 40px;
//   overflow: hidden;
// `

// const Image = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   display: block;
// `

/**
 * Renders user notifications
 */
const Notification = ({ notification, close, client }) => {
  const [{ auth }] = useStore()

  const ref = React.useRef(null)

  useClickOutside(ref, close)

  console.log(notification)

  useEffect(() => {
    // const updateNotificationSeen = async () => {
    //   try {
    //     await client.mutate({
    //       mutation: UPDATE_NOTIFICATION_SEEN,
    //       variables: {
    //         input: {
    //           id: auth.user.id,
    //           seenAll: true
    //         },
    //       },
    //       refetchQueries: () => [{ query: GET_AUTH_USER }],
    //     })
    //   } catch (err) {}
    // }
    // updateNotificationSeen()
  }, [auth.user.id, client])

  return (
    <NotificationItem ref={ref}>
      <A
        to={generatePath(Routes.USER_PROFILE, {
          username: notification.from[0].username,
        })}
      >
        <LeftSide>
          <Avatar image={notification.from[0].image} size={48} />

          <Spacing left='xs' />

          <Name>{notification.from[0].fullName}</Name>
        </LeftSide>
      </A>

      {notification.type === 'FOLLOW' && <Action>started following you</Action>}

      {notification.type === 'LIKE' && (
        <Action>
          likes your post
          <A to={generatePath(Routes.POST, { id: notification.postId })}>Go to post</A>
        </Action>
      )}

      {notification.type === 'COMMENT' && (
        <Action>
          commented on your post
          <A to={generatePath(Routes.POST, { id: notification.commentId })}>Go to post</A>
        </Action>
      )}
    </NotificationItem>
  )
}

Notification.propTypes = {
  client: PropTypes.object.isRequired,
  close: PropTypes.func,
}

export default withApollo(Notification)
