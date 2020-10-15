import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Comment from 'components/Comment'

const Root = styled.div`
  height: 100%;
  overflow: hidden;
  padding: 5px;
  box-shadow: 0 0 4px 1px ${(p) => p.theme.colors.grey[300]} inset;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    ${(p) => (!p.usedInModal ? 'max-height: 340px;' : 'height: 340px;')}
  }
`

const Comments = styled.div`
  ${(p) => (p.usedInModal ? 'height: 100%' : 'max-height: 330px')};
  overflow-y: scroll;
  box-sizing: content-box;
  padding: 0 ${(p) => p.theme.spacing.xs};
`

/**
 * Comments for PostPopup component
 */
const PostPopupComments = ({ usedInModal, comments, postAuthor, refetchPost }) => (
  <Root usedInModal={usedInModal}>
    <Comments usedInModal={usedInModal}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} postAuthor={postAuthor} refetchPost={refetchPost} />
      ))}
    </Comments>
  </Root>
)

PostPopupComments.propTypes = {
  usedInModal: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
  postAuthor: PropTypes.object.isRequired,

  refetchPost: PropTypes.func,
}

export default PostPopupComments
