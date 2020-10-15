import React, { memo, useState, Fragment } from 'react'
import styled from 'styled-components'
import { generatePath } from 'react-router-dom'
import { Query } from 'react-apollo'

import Empty from 'components/Empty'
import HtmlHeader from 'components/Head'
import InfiniteScroll from 'components/InfiniteScroll'
import { Container } from 'components/Layout'
import { Loading } from 'components/Loading'
import Modal from 'components/Modal'
import PostPopup from 'components/PostPopup'
import Skeleton from 'components/Skeleton'
import ExploreCard from './ExploreCard'

import { EXPLORE_PAGE_POSTS_LIMIT } from 'constants/DataLimit'

import { EXPLORE_POSTS } from 'graphql/post'

import * as Routes from 'routes'

const Root = styled(Container)`
  padding-top: ${(p) => p.theme.spacing.lg} !important;
  padding-bottom: ${(p) => p.theme.spacing.sm} !important;

  @media (min-width: ${(p) => p.theme.screen.lg}) {
    margin-left: ${(p) => p.theme.spacing.lg};
    padding: 0;
  }
`

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
`

/**
 * Explore page
 */
const Explore = memo(() => {
  const [modalPostId, setModalPostId] = useState(null)

  const closeModal = () => {
    window.history.pushState('', '', '/explore')
    setModalPostId(null)
  }

  const openModal = (postId) => {
    window.history.pushState('', '', generatePath(Routes.POST, { id: postId }))
    setModalPostId(postId)
  }

  const queryVariables = {
    skip: 0,
    limit: EXPLORE_PAGE_POSTS_LIMIT,
  }

  return (
    <Root maxWidth='md'>
      <HtmlHeader title='Explore New Posts and Users' />

      <Query
        query={EXPLORE_POSTS}
        variables={queryVariables}
        fetchPolicy='cache-and-network'
        notifyOnNetworkStatusChange
      >
        {({ data, loading, fetchMore, networkStatus }) => {
          if (loading && networkStatus === 1) {
            return (
              <PostsContainer>
                <Skeleton height={300} count={EXPLORE_PAGE_POSTS_LIMIT} />
              </PostsContainer>
            )
          }

          if (!data?.getPosts?.posts.length > 0) return <Empty text='No posts yet.' />

          return (
            <InfiniteScroll
              queryName='getPosts'
              data={data?.getPosts?.posts}
              dataKey='posts'
              dataLimit={EXPLORE_PAGE_POSTS_LIMIT}
              count={+data.getPosts?.count}
              variables={queryVariables}
              fetchMore={fetchMore}
            >
              {(posts) => {
                const showNextLoading = loading && networkStatus === 3 && data?.getPosts?.count !== posts.length

                return (
                  <Fragment>
                    <PostsContainer>
                      {posts.map((post) => (
                        <Fragment key={post.id}>
                          <Modal open={modalPostId === post.id} onClose={closeModal}>
                            <PostPopup postId={post.id} closeModal={closeModal} />
                          </Modal>

                          <ExploreCard
                            image={post.image}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            openPostPopup={() => openModal(post.id)}
                          />
                        </Fragment>
                      ))}
                    </PostsContainer>

                    {showNextLoading && <Loading top='lg' />}
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

export default Explore
