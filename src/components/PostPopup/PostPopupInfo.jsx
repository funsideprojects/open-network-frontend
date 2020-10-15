import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter, generatePath } from 'react-router-dom'
import { Button } from 'antd'
import { useApolloClient } from '@apollo/react-hooks'

import Avatar from 'components/Avatar'
import Follow from 'components/Follow'
import { Spacing } from 'components/Layout'
import { A, Username } from 'components/Text'
import PostCardPrivacy from 'components/PostCard/PostCardPrivacy'

import { DELETE_POST } from 'graphql/post'

import { useStore } from 'store'

import * as Routes from 'routes'

import { timeAgo } from 'utils/date'

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
  /* text-decoration: underline; */
  user-select: none;
  cursor: unset;
`

/**
 * Author info for PostPopup component
 */
const PostPopupInfo = ({ history, postId, author, isPrivate, createdAt, refetchPost }) => {
  const client = useApolloClient()
  const [{ auth }] = useStore()

  const deletePost = async () => {
    return await client
      .mutate({
        mutation: DELETE_POST,
        variables: { input: { id: postId } },
        refetchQueries: () => [`getPostsFromFollowedUsers`],
      })
      .then(() => {
        history.push(Routes.HOME)
      })
      .catch(() => {})
  }

  const pathToProfile = generatePath(Routes.USER_PROFILE, { username: author.username })

  return (
    <TopRow>
      <AuthorContainer>
        <Author to={pathToProfile}>
          <Avatar image={author.image} isOnline={author.isOnline} />
        </Author>

        <Spacing left='xs'>
          <Username to={pathToProfile} weight='bold'>
            {author.fullName}
          </Username>
          <CreatedAtAndPrivacy>
            <PostCardPrivacy
              postId={postId}
              isPrivate={isPrivate}
              isPostBelongsToAuthUser={auth.user.id === author.id}
              refetchPost={refetchPost}
            />
            <CreatedAt>{timeAgo(createdAt)}</CreatedAt>
          </CreatedAtAndPrivacy>
        </Spacing>
      </AuthorContainer>

      {auth.user.id !== author.id ? (
        <Follow user={author} />
      ) : (
        <Button type='danger' size='small' onClick={deletePost}>
          Delete
        </Button>
      )}
    </TopRow>
  )
}

PostPopupInfo.propTypes = {
  postId: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,

  refetchPost: PropTypes.func,
}

export default withRouter(PostPopupInfo)
