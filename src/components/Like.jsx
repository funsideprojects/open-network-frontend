import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from '@apollo/client/react/components'

import { LikeIcon } from 'components/icons'
import { Spacing } from './Layout'
import { StyledButton } from './PostCard/components'

import { CREATE_LIKE, DELETE_LIKE } from 'graphql/like'

import { useStore } from 'store'

const Like = ({
  withText = false,
  postId,
  likes,
  refetchPost,
  getUserPosts = false,
  refetchGetPostFromFollowedUsers,
}) => {
  const [{ auth }] = useStore()
  const [loading, setLoading] = useState(false)

  const hasLiked = likes.find((l) => l.user.id === auth.user.id)

  const handleButtonClick = async (mutate) => {
    setLoading(true)
    await mutate()
      .then(async () => {
        if (typeof refetchPost === 'function') await refetchPost()
        if (refetchGetPostFromFollowedUsers) refetchGetPostFromFollowedUsers()
      })
      .finally(() => setLoading(false))
  }

  return (
    <Mutation
      key="xx"
      mutation={hasLiked ? DELETE_LIKE : CREATE_LIKE}
      variables={{ input: { postId } }}
      refetchQueries={() => [...(getUserPosts ? [`getUserPosts`] : [])]}
    >
      {(mutate) => {
        return (
          <StyledButton
            disabled={loading}
            text
            onClick={() => handleButtonClick(mutate)}
            color={hasLiked && 'primary.main'}
            active={hasLiked}
          >
            <LikeIcon {...(hasLiked ? { color: 'white' } : {})} />
            <Spacing inline left="xxs" />
            {withText && <b>Like</b>}
          </StyledButton>
        )
      }}
    </Mutation>
  )
}

Like.propTypes = {
  withText: PropTypes.bool,
  fullWidth: PropTypes.bool,
  postId: PropTypes.string.isRequired,
  likes: PropTypes.array,

  refetchPost: PropTypes.func,
  getUserPosts: PropTypes.bool,
  refetchGetPostFromFollowedUsers: PropTypes.func,
}

export default Like
