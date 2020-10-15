import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Query } from 'react-apollo'

import { CloseIcon } from 'components/icons'
import CreateComment from 'components/CreateComment'
import { Button } from 'components/Form'
import HtmlHeader from 'components/Head'
import { Spacing } from 'components/Layout'
import Likes from 'components/Likes'
import { Loading } from 'components/Loading'
import NotFound from 'components/NotFound'
import PostTitle from 'components/PostTitle'

import PostPopupInfo from './PostPopupInfo'
import PostPopupImages from './PostPopupImages'
import PostPopupComments from './PostPopupComments'
import PostPopupOptions from './PostPopupOptions'

import { GET_POST } from 'graphql/post'

import { useStore } from 'store'

// import { getImageLink } from 'utils/image-link'

const Root = styled.div`
  width: 100%;
  margin: 0 auto;
  margin: ${(p) => !p.usedInModal && p.theme.spacing.lg} 0;
  box-shadow: ${(p) => p.theme.shadows.sm};
  border-radius: ${(p) => p.theme.radius.sm};
  z-index: ${(p) => (p.usedInModal ? p.theme.zIndex.xl : 'inherit')};
  overflow: hidden;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: auto;
  }
`

const Container = styled.div`
  max-width: 1300px;
  max-height: ${(p) => (p.usedInModal ? '600px' : 'auto')};
  overflow-y: ${(p) => (p.usedInModal ? 'auto' : 'inherit')};
  background-color: ${(p) => p.theme.colors.white};
  display: flex;
  flex-direction: column;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    flex-direction: ${(p) => (p.usedInModal ? 'row' : 'column')};
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(p) => (p.usedInModal ? 'center' : 'flex-start')};
  justify-content: center;
  background-color: ${(p) => p.theme.colors.black};
  width: 100%;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    max-width: 1000px;
    min-width: 500px;
    height: ${(p) => (p.usedInModal ? '600px' : 'auto')};
  }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  background-color: ${(p) => p.theme.colors.white};

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => (p.usedInModal ? '360px' : '100%')};
    min-width: 360px;
  }
`

const CloseModal = styled.div`
  display: block;
  position: fixed;
  right: 20px;
  top: 15px;
  cursor: pointer;
`

const Count = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.md};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.colors.text.secondary};
`

const StyledButton = styled(Button)`
  padding: 0;
  padding-left: 4px;
  font-size: ${(p) => p.theme.font.size.xxs};

  &:hover {
    text-decoration: underline;
  }
`

const PostPopup = ({ postId, closeModal, usedInModal = true, refetchExplorePosts = false }) => {
  const [{ auth }] = useStore()

  return (
    <Query query={GET_POST} variables={{ postId }} fetchPolicy='no-cache'>
      {({ data, refetch, loading, error }) => {
        if (loading) return <Loading top='lg' />
        if (error) return <NotFound />

        const post = data.getPost

        const title = post.title && post.title.length < 10 ? post.title : `${post.author.username}'s post`

        return (
          <Root usedInModal={usedInModal}>
            <HtmlHeader title={title} />

            {closeModal && (
              <CloseModal onClick={closeModal}>
                <CloseIcon width='16' color='white' />
              </CloseModal>
            )}

            <Container usedInModal={usedInModal}>
              <Left usedInModal={usedInModal}>
                <PostPopupImages images={post.images} />
              </Left>

              <Right usedInModal={usedInModal}>
                <Spacing>
                  <PostPopupInfo
                    postId={post.id}
                    author={post.author}
                    isPrivate={post.isPrivate}
                    createdAt={post.createdAt}
                    refetchPost={refetch}
                  />

                  <PostTitle
                    usedInModal
                    postId={postId}
                    title={post.title}
                    isPostBelongsToAuthUser={auth.user.id === post.author.id}
                    refetchPost={refetch}
                  />

                  {usedInModal && (
                    <PostPopupComments
                      usedInModal={usedInModal}
                      comments={post.comments}
                      postAuthor={post.author}
                      refetchPost={refetch}
                    />
                  )}
                  <Count>
                    <Likes likeCount={post.likeCount} likes={post.likes} />

                    <StyledButton text>{post.commentCount} comments</StyledButton>
                  </Count>
                </Spacing>

                <Spacing>
                  <PostPopupOptions
                    postId={post.id}
                    postAuthor={post.author}
                    postLikes={post.likes}
                    refetchPost={refetch}
                  />

                  <CreateComment postId={post.id} refetchPost={refetch} />
                  {!usedInModal && (
                    <PostPopupComments
                      usedInModal={usedInModal}
                      comments={post.comments}
                      postAuthor={post.author}
                      refetchPost={refetch}
                    />
                  )}
                </Spacing>
              </Right>
            </Container>
          </Root>
        )
      }}
    </Query>
  )
}

PostPopup.propTypes = {
  postId: PropTypes.string.isRequired,
  usedInModal: PropTypes.bool,

  closeModal: PropTypes.func,
  refetchExplorePosts: PropTypes.bool,
}

export default withRouter(PostPopup)
