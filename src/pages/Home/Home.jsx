import React, { memo, Fragment, useState } from 'react'
import styled from 'styled-components'
import { generatePath } from 'react-router-dom'
import { Query } from 'react-apollo'
import LazyLoad from 'react-lazyload'

import PostCardSkeleton from 'components/PostCard/PostCardSkeleton'
import { A } from 'components/Text'
import PostPopup from 'components/PostPopup'
import Modal from 'components/Modal'
import PostCard from 'components/PostCard'
import { Spacing, Container } from 'components/Layout'
import InfiniteScroll from 'components/InfiniteScroll'
import CreatePost from 'components/CreatePost'
import HtmlHeader from 'components/Head'

import { HOME_PAGE_POSTS_LIMIT } from 'constants/DataLimit'

import { GET_POSTS_FROM_FOLLOWED_USERS } from 'graphql/post'

import ButtonReload from './ButtonReload'

import * as Routes from 'routes'

const Root = styled(Container)`
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Empty = styled.div`
  padding: ${(p) => p.theme.spacing.sm};
  border: 1px solid ${(p) => p.theme.colors.border.main};
  border-radius: ${(p) => p.theme.radius.sm};
  margin-top: ${(p) => p.theme.spacing.lg};
  background-color: ${(p) => p.theme.colors.white};
`

const StyledA = styled(A)`
  text-decoration: underline;
  font-weight: ${(p) => p.theme.font.weight.bold};
`

/**
 * Home page of the app
 */
const Home = memo(() => {
  const [modalPostId, setModalPostId] = useState(null)
  const queryVariables = { skip: 0, limit: HOME_PAGE_POSTS_LIMIT }

  const closeModal = () => {
    window.history.pushState('', '', '/')
    setModalPostId(null)
  }

  const openModal = (postId) => {
    window.history.pushState('', '', generatePath(Routes.POST, { id: postId }))
    setModalPostId(postId)
  }

  return (
    <Root id='postsContainer' maxWidth='sm'>
      <HtmlHeader />

      <CreatePost getPostsFromFollowedUsers />

      <Query
        query={GET_POSTS_FROM_FOLLOWED_USERS}
        variables={queryVariables}
        fetchPolicy='cache-and-network'
        notifyOnNetworkStatusChange
      >
        {({ data, loading, fetchMore, networkStatus }) => {
          if (loading && networkStatus === 1) {
            return <PostCardSkeleton />
          }

          // There's no post
          if (!data?.getPosts?.posts.length) {
            return (
              <Empty>
                <StyledA to={generatePath(Routes.EXPLORE)}>Explore new posts</StyledA> or{' '}
                <StyledA to={generatePath(Routes.PEOPLE)}>Find new people</StyledA>
              </Empty>
            )
          }

          return (
            <InfiniteScroll
              containerId='postsContainer'
              queryName='getPosts'
              data={data.getPosts.posts}
              dataKey='posts'
              dataLimit={HOME_PAGE_POSTS_LIMIT}
              count={+data.getPosts.count}
              variables={queryVariables}
              fetchMore={fetchMore}
            >
              {(posts, renewData) => {
                const showNextLoading = loading && networkStatus === 3 && data.getPosts?.count !== posts.length

                return (
                  <Fragment>
                    <Spacing top='sm' />

                    <ButtonReload renewData={renewData} />

                    {posts?.map((post) => {
                      return (
                        <LazyLoad once key={post.id} throttle={200} height={400} offset={[0, 0]}>
                          <Modal open={modalPostId === post.id} onClose={closeModal}>
                            <PostPopup postId={post.id} closeModal={closeModal} />
                          </Modal>

                          <Spacing bottom='sm' top='sm'>
                            <PostCard
                              {...post}
                              postId={post.id}
                              openModal={() => openModal(post.id)}
                              refetchGetPostFromFollowedUsers={renewData}
                            />
                          </Spacing>
                        </LazyLoad>
                      )
                    })}

                    {showNextLoading && <PostCardSkeleton />}
                  </Fragment>
                )
              }}
            </InfiniteScroll>
          )
        }}
      </Query>
    </Root>
  )
})

export default Home
