import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mutation, useApolloClient } from 'react-apollo'

import { GET_FOLLOWED_USERS, CREATE_FOLLOW, DELETE_FOLLOW } from 'graphql/follow'

import { useStore } from 'store'

import { SET_FOLLOW } from 'store/follow'

const Button = styled.button`
  height: 27px;
  cursor: pointer;
  outline: none;
  font-size: ${(p) => p.theme.font.size.tiny};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => (p.isFollowing ? p.theme.colors.error.main : p.theme.colors.white)};
  transition: background-color 0.2s, border-color 0.1s;
  border: ${(p) => (p.isFollowing ? `1px solid ${p.theme.colors.error.main}` : '0')};
  border-radius: ${(p) => p.theme.radius.lg};
  padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
  background-color: ${(p) => (p.isFollowing ? 'transparent' : p.theme.colors.primary.main)};
  user-select: none;

  &:hover {
    color: ${(p) => (p.isFollowing ? p.theme.colors.error.light : p.theme.colors.white)};
    border-color: ${(p) => (p.isFollowing ? p.theme.colors.error.light : p.theme.colors.primary.light)};
    background-color: ${(p) => (p.isFollowing ? p.theme.colors.white : p.theme.colors.primary.light)};
  }
`

/**
 * Component for rendering follow button
 */
const Follow = memo(({ user }) => {
  const client = useApolloClient()
  const [{ follow }, dispatch] = useStore()
  const [loading, setLoading] = useState(false)

  const isFollowing = follow.followed.users.find((f) => f.id === user.id)

  const handleClickFollow = async (mutate) => {
    setLoading(true)
    await mutate()
      .then(async () => {
        await client
          .query({ query: GET_FOLLOWED_USERS, fetchPolicy: 'no-cache' })
          .then(({ data }) => {
            dispatch({ type: SET_FOLLOW, payload: data.getFollowedUsers })
          })
          .catch(() => {})
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  return (
    <Mutation mutation={isFollowing ? DELETE_FOLLOW : CREATE_FOLLOW} variables={{ input: { userId: user.id } }}>
      {(mutate) => (
        <Button onClick={() => handleClickFollow(mutate)} disabled={loading} isFollowing={isFollowing}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </Mutation>
  )
})

Follow.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Follow
