import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { generatePath } from 'react-router-dom'

import Skeleton from 'components/Skeleton'
import Modal from 'components/Modal'
import PostPopup from 'components/PostPopup'
import PostCard from 'components/PostCard'
import { Spacing } from 'components/Layout'
import InfiniteScroll from 'components/InfiniteScroll'
import { Loading } from 'components/Loading'
import Empty from 'components/Empty'

import { PROFILE_PAGE_POSTS_LIMIT } from 'constants/DataLimit'

import { GET_USER_POSTS } from 'graphql/post'

import * as Routes from 'routes'

/**
 * Renders posts in profile page
 */
const ProfilePosts = ({ username }) => {
  const [modalPostId, setModalPostId] = useState('')

  const openModal = (postId) => {
    window.history.pushState('', '', generatePath(Routes.POST, { id: postId }))
    setModalPostId(postId)
  }

  const closeModal = () => {
    window.history.pushState('', '', generatePath(Routes.USER_PROFILE, { username }))
    setModalPostId(null)
  }

  const queryVariables = { username, skip: 0, limit: PROFILE_PAGE_POSTS_LIMIT }

  return (
    <Query
      query={GET_USER_POSTS}
      variables={queryVariables}
      fetchPolicy='cache-and-network'
      notifyOnNetworkStatusChange
    >
      {({ data, loading, refetch, fetchMore, networkStatus }) => {
        if (loading && networkStatus === 1) {
          return <Skeleton height={500} bottom='lg' top='lg' count={PROFILE_PAGE_POSTS_LIMIT} />
        }

        if (!data.getPosts.posts.length > 0) {
          return (
            <Spacing bottom='lg'>
              <Empty text='No posts yet.' />
            </Spacing>
          )
        }

        return (
          <InfiniteScroll
            queryName='getPosts'
            data={data?.getPosts?.posts}
            dataKey='posts'
            dataLimit={PROFILE_PAGE_POSTS_LIMIT}
            count={+data.getPosts?.count}
            variables={queryVariables}
            fetchMore={fetchMore}
          >
            {(posts) => {
              const showNextLoading = loading && networkStatus === 3 && data.getPosts?.count !== posts.length

              return (
                <Fragment>
                  <Spacing top='sm' />

                  {posts.map((post) => (
                    <Fragment key={post.id}>
                      <Modal open={modalPostId === post.id} onClose={closeModal}>
                        <PostPopup postId={post.id} closeModal={closeModal} />
                      </Modal>

                      <Spacing bottom='lg' top='lg'>
                        <PostCard
                          {...post}
                          postId={post.id}
                          openModal={() => openModal(post.id)}
                          refetchGetUserPosts={refetch}
                        />
                      </Spacing>
                    </Fragment>
                  ))}

                  {showNextLoading && <Loading top='lg' />}
                </Fragment>
              )
            }}
          </InfiniteScroll>
        )
      }}
    </Query>
  )
}

ProfilePosts.propTypes = {
  username: PropTypes.string.isRequired,
}

export default ProfilePosts
