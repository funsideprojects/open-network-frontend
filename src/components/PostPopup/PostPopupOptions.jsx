import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PostCommentIcon } from 'components/icons'
import { Button } from 'components/Form'
import { Spacing } from 'components/Layout'
import Like from 'components/Like'

const Root = styled.div`
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};
`

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

/**
 * Options for PostPopup component
 */
const PostPopupOptions = ({ postId, postLikes, refetchPost }) => {
  return (
    <Root>
      <Icons>
        <Like withText fullWidth postId={postId} likes={postLikes} refetchPost={refetchPost} />

        <Button fullWidth text>
          <PostCommentIcon />
          <Spacing inline left='xxs' /> <b>Comment</b>
        </Button>
      </Icons>
    </Root>
  )
}

PostPopupOptions.propTypes = {
  postId: PropTypes.string.isRequired,
  postLikes: PropTypes.array.isRequired,

  refetchPost: PropTypes.func,
}

export default PostPopupOptions
