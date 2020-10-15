import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { get, uniqBy } from 'lodash'

import Comment from 'components/Comment'
import CommentSkeleton from 'components/CommentSkeleton'
import CreateComment from 'components/CreateComment'

import { GET_COMMENTS_OF_SELECTED_POST } from 'graphql/comment'

import { COMMENT_LIMIT } from 'constants/DataLimit'

const Line = styled.div`
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
`

const CommentsContainer = styled.div`
  width: 100%;
  padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.sm} 0;
`

const ButtonContainer = styled.div`
  width: 100%;
  justify-content: center;
  text-align: center;
  margin-bottom: 12px;
`

const ButtonLoadMore = styled(Button)`
  padding: 6px 12px;
  border: none;
  border-radius: 999px;
  background-color: ${(p) => p.theme.colors.primary.main};
  text-align: center;
  font-size: 12px;
  color: ${(p) => p.theme.colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.colors.primary.light};
    color: ${(p) => p.theme.colors.white};
  }
`

const Comments = ({ postId, postAuthor, commentCount, refetchGetUserPosts, refetchGetPostFromFollowedUsers }) => {
  const { data, loading, error, fetchMore, networkStatus } = useQuery(GET_COMMENTS_OF_SELECTED_POST, {
    variables: { postId, skip: 0, limit: COMMENT_LIMIT },
    fetchPolicy: 'cache-and-network',
  })

  const renewComments = (commentLimit = COMMENT_LIMIT) => {
    const renewLimit = data.getComments.comments.length + commentLimit

    return fetchMore({
      variables: { postId, skip: 0, limit: renewLimit <= 0 ? COMMENT_LIMIT : renewLimit },
      updateQuery: (_previousQueryResult, { fetchMoreResult: _fetchMoreResult }) => {
        if (!_fetchMoreResult) return _previousQueryResult
        return _fetchMoreResult
      },
    })
  }

  const loadMore = () => {
    const dataKey = 'getComments.comments'

    return fetchMore({
      variables: { postId, skip: data.getComments.comments.length },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousQueryResult

        if (fetchMoreResult.getComments.count !== previousQueryResult.getComments.count) {
          if (typeof refetchGetUserPosts === 'function') refetchGetUserPosts()
          if (typeof refetchGetPostFromFollowedUsers === 'function') refetchGetPostFromFollowedUsers()
          renewComments()

          return previousQueryResult
        }

        const hasDuplInComments = fetchMoreResult.getComments.comments.filter(({ id }) =>
          previousQueryResult.getComments.comments.some(({ id: _id }) => id === _id)
        )

        if (hasDuplInComments.length) {
          renewComments()

          return previousQueryResult
        }

        const previousData = get(previousQueryResult, dataKey)
        const fetchMoreData = get(fetchMoreResult, dataKey)

        return Object.assign({}, previousQueryResult, {
          getComments: {
            count: fetchMoreResult.getComments.count,
            comments: uniqBy([...previousData, ...fetchMoreData]),
          },
        })
      },
    })
  }

  const renderComments = () => {
    if (error) {
      if (error.message.indexOf('Post not found!') > -1) {
        if (typeof refetchGetUserPosts === 'function') refetchGetUserPosts()
        if (typeof refetchGetPostFromFollowedUsers === 'function') refetchGetPostFromFollowedUsers()
      }

      return null
    }

    if (loading && networkStatus === 1) {
      return <CommentSkeleton />
    }

    if (!data.getComments || !data.getComments.comments.length) {
      return null
    }

    return data?.getComments.comments.map((comment, index) => (
      <Comment
        key={index}
        comment={comment}
        postAuthor={postAuthor}
        refetchComments={renewComments}
        refetchGetUserPosts={refetchGetUserPosts}
        refetchGetPostFromFollowedUsers={refetchGetPostFromFollowedUsers}
      />
    ))
  }

  return (
    <Fragment>
      <Line />

      <CreateComment
        postId={postId}
        refetchComments={renewComments}
        refetchGetUserPosts={refetchGetUserPosts}
        refetchGetPostFromFollowedUsers={refetchGetPostFromFollowedUsers}
      />

      {commentCount > 0 && <Line />}

      <CommentsContainer>
        {renderComments()}

        {data?.getComments.count > data?.getComments.comments.length && (
          <ButtonContainer>
            <ButtonLoadMore onClick={loadMore}>More Comments</ButtonLoadMore>
          </ButtonContainer>
        )}
      </CommentsContainer>
    </Fragment>
  )
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  postAuthor: PropTypes.object.isRequired,
  commentCount: PropTypes.number.isRequired,

  refetchGetUserPosts: PropTypes.func,
  refetchGetPostFromFollowedUsers: PropTypes.func,
}

export default Comments
