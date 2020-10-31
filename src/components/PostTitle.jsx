import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { Input, Button, Tooltip } from 'antd'

import { PostTitleSkeleton } from 'components/Skeletons/PostTitleSkeleton'

import { UPDATE_POST } from 'graphql/post'

const TextContainer = styled.div`
  ${(p) =>
    p.usedInModal
      ? `height: 72px;
  padding: 5px 10px 0;`
      : ''}

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const StyledTextArea = styled(Input.TextArea)`
  resize: none;
  border-radius: ${(p) => p.theme.radius.lg};
`

const Title = styled.span`
  ${(p) =>
    p.usedInModal
      ? `
font-size: ${p.theme.font.size.xs};
padding: ${p.theme.spacing.xs} ${p.theme.spacing.sm};
height: 72px;
overflow: scroll;`
      : ''}

  ${(p) => (p.isPostBelongsToAuthUser ? `cursor: pointer;` : '')}
  white-space: pre-wrap;
  display: block;
  word-break: break-word;
`

const PostTitle = ({
  usedInModal = false,
  postId,
  title,
  isPostBelongsToAuthUser,
  refetchPost,
  getUserPosts = false,
  refetchGetPostFromFollowedUsers,
}) => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef(null)

  const updatePostTitle = async (value = '') => {
    setLoading(true)
    return await client
      .mutate({
        mutation: UPDATE_POST,
        variables: { input: { id: postId, title: value } },
        refetchQueries: () => [...(getUserPosts ? [`getUserPosts`] : [])],
      })
      .then(async () => {
        if (typeof refetchPost === 'function') await refetchPost()
        if (typeof refetchGetPostFromFollowedUsers === 'function') refetchGetPostFromFollowedUsers()
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
        setIsEditing(false)
      })
  }

  const onFocus = (e) => {
    const tempVal = e.target.value
    e.target.value = ''
    e.target.value = tempVal
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      updatePostTitle(e.target.value)
    } else if (e.key === 'Escape') {
      inputRef.current.blur()
    }
  }

  if (loading)
    return (
      <TextContainer usedInModal={usedInModal}>
        <PostTitleSkeleton />
      </TextContainer>
    )

  if (isEditing)
    return (
      <TextContainer usedInModal={usedInModal}>
        <StyledTextArea
          ref={inputRef}
          defaultValue={title}
          autoSize={{ minRows: 1 }}
          onKeyDown={onKeyDown}
          autoFocus
          onFocus={onFocus}
          onBlur={() => setIsEditing(false)}
          placeholder="Add caption here..."
          disabled={loading}
        />
      </TextContainer>
    )

  if (!isPostBelongsToAuthUser) return <Title usedInModal={usedInModal}>{title}</Title>

  return title ? (
    <Tooltip title="Double-click to edit" mouseEnterDelay={1} placement="left">
      <Title
        usedInModal={usedInModal}
        isPostBelongsToAuthUser={isPostBelongsToAuthUser}
        onDoubleClick={() => isPostBelongsToAuthUser && setIsEditing(true)}
      >
        {title}
      </Title>
    </Tooltip>
  ) : (
    <TextContainer usedInModal={usedInModal}>
      <Button type="link" onClick={() => setIsEditing(true)}>
        Add caption...
      </Button>
    </TextContainer>
  )
}

PostTitle.propTypes = {
  usedInModal: PropTypes.bool,

  postId: PropTypes.string.isRequired,
  title: PropTypes.string,
  isPostBelongsToAuthUser: PropTypes.bool.isRequired,

  refetchPost: PropTypes.func,
  getUserPosts: PropTypes.bool,
  getPostsFromFollowedUsers: PropTypes.bool,
}

export default PostTitle
