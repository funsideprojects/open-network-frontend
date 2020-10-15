import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { generatePath } from 'react-router-dom'
import { useApolloClient } from 'react-apollo'
import { Button, Dropdown, Menu } from 'antd'

import { GET_FOLLOWED_USERS, CREATE_FOLLOW, DELETE_FOLLOW } from 'graphql/follow'

import { useStore } from 'store'
import { SET_FOLLOWED } from 'store/follow'

import { DotsIcon } from 'components/icons'

import * as Routes from 'routes'

const StyledFollowItem = styled.span`
  ${(p) => (p.isFollowing ? `color: ${p.theme.colors.error.light};` : '')}

  &:after {
    content: "${(p) => (p.isFollowing ? 'Unfollow' : 'Follow')}";
  }
`

const StyledDeleteItem = styled.span`
  color: ${(p) => p.theme.colors.error.light};

  &:after {
    content: 'Delete post';
  }
`

/**
 * Post Card options, meant to be used in PostCard components Modal
 */
const PostCardOption = memo(({ postId, author, deletePost }) => {
  const client = useApolloClient()
  const [{ auth, follow }, dispatch] = useStore()

  const isFollowing = follow.followed.users.find((f) => f.id === author.id)

  const handleClickFollow = async () => {
    await client
      .mutate({ mutation: isFollowing ? DELETE_FOLLOW : CREATE_FOLLOW, variables: { input: { userId: author.id } } })
      .then(async () => {
        await client
          .query({ query: GET_FOLLOWED_USERS, fetchPolicy: 'no-cache' })
          .then(({ data }) => {
            dispatch({ type: SET_FOLLOWED, payload: data.getFollowedUsers })
          })
          .catch(() => {})
      })
      .catch(() => {})
  }

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(`${window.location.origin}${generatePath(Routes.POST, { id: postId })}`)
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error)
    }
  }

  const onMenuItemClicked = ({ key }) => {
    switch (key) {
      case 'follow': {
        handleClickFollow()

        break
      }

      case 'copyLink': {
        copyToClipboard()

        break
      }

      case 'deletePost': {
        deletePost()

        break
      }

      default: {
        break
      }
    }
  }

  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu onClick={onMenuItemClicked}>
          {auth.user.id !== author.id && (
            <Menu.Item key='follow'>
              <StyledFollowItem isFollowing={isFollowing} />
            </Menu.Item>
          )}
          <Menu.Item key='copyLink'>Copy link</Menu.Item>
          {auth.user.id === author.id && (
            <Menu.Item key='deletePost'>
              <StyledDeleteItem />
            </Menu.Item>
          )}
        </Menu>
      }
    >
      <Button type='link' size='small'>
        <DotsIcon width='16' />
      </Button>
    </Dropdown>
  )
})

PostCardOption.propTypes = {
  postId: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,

  deletePost: PropTypes.func.isRequired,
}

export default PostCardOption
