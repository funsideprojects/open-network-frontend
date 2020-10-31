import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { animated } from 'react-spring'

import { PostCommentIcon } from 'components/icons'
import PostCardImages from 'components/PostCard/PostCardImages'
import PostCardOption from 'components/PostCard/PostCardOption'
import PostCardPrivacy from 'components/PostCard/PostCardPrivacy'
import Avatar from 'components/Avatar'
import Comments from 'components/Comments'
import { StyledButton } from 'components/PostCard/components'
import { Spacing } from 'components/Layout'
import Like from 'components/Like'
import Likes from 'components/Likes'
import PostTitle from 'components/PostTitle'
import { A, Username } from 'components/Text'

import { DELETE_POST } from 'graphql/post'

import { useStore } from 'store'

import { timeAgo } from 'utils/date'

import * as Routes from 'routes'

const Root = styled.div`
  width: 100%;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.radius.lg};
  box-shadow: ${(p) => p.theme.shadows.sm};
`

const AnimatedRoot = animated(Root)

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.sm};
`

const AuthorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Author = styled(A)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CreatedAtAndPrivacy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${(p) => p.theme.font.size.xxs};
  color: ${(p) => p.theme.colors.text.hint};
`

const CreatedAt = styled.span`
  margin-left: 7px;
  user-select: none;
  cursor: unset;
`

const BottomRow = styled.div`
  overflow: hidden;
`

const CountAndIcons = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
  margin-top: ${(p) => p.theme.spacing.xs};
`

const Count = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${(p) => p.theme.spacing.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.colors.text.secondary};
`

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
  padding: ${(p) => p.theme.spacing.xs};
`

const PostCard = ({
  postId,
  title,
  images,
  authorId,
  isPrivate,
  author,
  likeCount,
  likes,
  commentCount,
  createdAt,
  // updatedAt,
  style = {},
  openModal,
  refetchGetUserPosts,
  refetchGetPostFromFollowedUsers,
}) => {
  const client = useApolloClient()
  const [{ auth }] = useStore()
  const [isCommentOpen, setIsCommentOpen] = useState(false)

  const toggleComment = () => {
    setIsCommentOpen(!isCommentOpen)
  }

  const deletePost = async () => {
    return await client
      .mutate({
        mutation: DELETE_POST,
        variables: { input: { id: postId } },
        refetchQueries: () => [...(typeof refetchGetUserPosts === 'function' ? [`getUserPosts`] : [])],
      })
      .then(() => {
        if (typeof refetchGetPostFromFollowedUsers === 'function') refetchGetPostFromFollowedUsers()
      })
  }

  const pathToProfile = generatePath(Routes.USER_PROFILE, { username: author.username })

  return (
    <AnimatedRoot style={style}>
      <TopRow>
        <AuthorContainer>
          <Author to={pathToProfile}>
            <Avatar image={author.image} isOnline={author.isOnline} size={40} />
          </Author>

          <Spacing left="xs">
            <Username to={pathToProfile} weight="bold">
              {author.fullName}
            </Username>
            <CreatedAtAndPrivacy>
              <PostCardPrivacy
                postId={postId}
                isPrivate={isPrivate}
                isPostBelongsToAuthUser={auth.user.id === authorId}
                getUserPosts={typeof refetchGetUserPosts === 'function'}
                refetchGetPostFromFollowedUsers={refetchGetPostFromFollowedUsers}
              />
              <CreatedAt>{timeAgo(createdAt)}</CreatedAt>
            </CreatedAtAndPrivacy>
          </Spacing>
        </AuthorContainer>

        <PostCardOption postId={postId} author={author} deletePost={deletePost} />
      </TopRow>

      <Spacing left="sm" bottom="sm" top="xs" right="sm">
        <PostTitle
          postId={postId}
          title={title}
          isPostBelongsToAuthUser={auth.user.id === authorId}
          getUserPosts={typeof refetchGetUserPosts === 'function'}
          refetchGetPostFromFollowedUsers={refetchGetPostFromFollowedUsers}
        />
      </Spacing>

      <PostCardImages images={images} openModal={openModal} />

      <BottomRow>
        <CountAndIcons>
          <Count>
            <Likes likeCount={likeCount} likes={likes} />

            <span style={{ userSelect: 'none' }}>
              {commentCount} comment{commentCount > 1 ? `s` : ''}
            </span>
          </Count>

          <Icons>
            <Like
              withText
              postId={postId}
              likes={likes}
              getUserPosts={typeof refetchGetUserPosts === 'function'}
              refetchGetPostFromFollowedUsers={refetchGetPostFromFollowedUsers}
            />

            <StyledButton active={isCommentOpen} text onClick={toggleComment}>
              <PostCommentIcon {...(isCommentOpen && { color: 'white' })} /> <Spacing inline left="xxs" />{' '}
              <b>Comment</b>
            </StyledButton>
          </Icons>
        </CountAndIcons>

        {isCommentOpen && (
          <Comments
            postId={postId}
            postAuthor={author}
            commentCount={commentCount}
            refetchGetUserPosts={refetchGetUserPosts}
            refetchGetPostFromFollowedUsers={refetchGetPostFromFollowedUsers}
          />
        )}
      </BottomRow>
    </AnimatedRoot>
  )
}

PostCard.propTypes = {
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.array,
  authorId: PropTypes.string,
  isPrivate: PropTypes.bool,

  author: PropTypes.object.isRequired,
  likeCount: PropTypes.number.isRequired,
  likes: PropTypes.array.isRequired,
  commentCount: PropTypes.number,

  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,

  style: PropTypes.object,

  openModal: PropTypes.func.isRequired,
  refetchGetUserPosts: PropTypes.func,
  refetchGetPostFromFollowedUsers: PropTypes.func,
}

export default PostCard
