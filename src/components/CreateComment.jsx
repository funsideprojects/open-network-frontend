import React, { useState, useRef, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from 'antd'
import { useApolloClient } from '@apollo/react-hooks'

import { CREATE_COMMENT } from 'graphql/comment'

import ImagePreview from 'components/ImagePreview'
import { UploadImageIcon } from 'components/icons'

const Root = styled.div`
  width: 100%;
  height: 54px;
  padding: 0px ${(p) => p.theme.spacing.sm};
  display: flex;
  align-items: center;
  position: relative;
`

const StyledInput = styled(Input.TextArea)`
  outline: 0;
  min-height: 38px !important;
  max-height: 38px !important;
  width: calc(100% - 0px);
  border: 1px solid ${(p) => p.theme.colors.border.main};
  border-radius: 999px;
  padding: 6px ${(p) => p.theme.spacing.xs};
  color: ${(p) => p.theme.colors.text.secondary};
  resize: none;

  &:focus {
    box-shadow: none;
    border-color: ${(p) => p.theme.colors.border.main};
  }
`

const WrapperAction = styled.div`
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const RadiusButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0;
  background: ${(p) => p.theme.colors.white};
  cursor: pointer;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${(p) => p.theme.colors.grey[100]};
  }
`

const WrapperImage = styled.div`
  width: calc(100% - 74px);
  height: 86px;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 50%;
  bottom: 50%;
  border-radius: ${(p) => p.theme.radius.sm};
  transform: translate(-50%, -19px);
`

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 9px;
  cursor: pointer;
`

const InputFile = styled.input`
  display: none;
`

/**
 * Creates a comment for a post
 */
const CreateComment = ({
  postId,
  refetchPost,
  refetchComments,
  refetchGetUserPosts,
  refetchGetPostFromFollowedUsers,
}) => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)

  const inputRef = useRef(null)

  const handlePostImageUpload = (e) => {
    const { files } = e.target

    if (!files.length) return

    setImage(files[0])
  }

  const deleteImage = () => setImage(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [loading])

  const submitComment = async (comment) => {
    if ((!comment || comment.replace(/^$|\s+/, '').length === 0) && !image) {
      return
    }

    setLoading(true)
    return await client
      .mutate({
        mutation: CREATE_COMMENT,
        variables: { input: { comment, postId, image } },
      })
      .then(() => {
        handleReset()
        if (typeof refetchPost === 'function') refetchPost()
        if (typeof refetchComments === 'function') refetchComments(1)
        if (typeof refetchGetUserPosts === 'function') refetchGetUserPosts()
        if (typeof refetchGetPostFromFollowedUsers === 'function') refetchGetPostFromFollowedUsers()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  const handleReset = () => {
    inputRef.current.handleReset()
    setImage(null)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      submitComment(e.target.value)
    }
  }

  return (
    <Root>
      <StyledInput
        autoSize={{ minRows: 1 }}
        onKeyDown={onKeyDown}
        autoFocus
        ref={inputRef}
        placeholder='Add a comment...'
        disabled={loading}
      />

      <WrapperAction>
        <RadiusButton>
          <InputFile id='message-image' type='file' accept='image/x-png,image/jpeg' onChange={handlePostImageUpload} />
          <Label htmlFor='message-image'>
            <UploadImageIcon size={10} />
          </Label>
        </RadiusButton>
      </WrapperAction>

      {image ? (
        <WrapperImage>
          <ImagePreview image={image} deleteImage={deleteImage} width={84} height={84} />
        </WrapperImage>
      ) : (
        <Fragment />
      )}
    </Root>
  )
}

CreateComment.propTypes = {
  postId: PropTypes.string.isRequired,

  refetchPost: PropTypes.func,
  refetchComments: PropTypes.func,
  refetchGetUserPosts: PropTypes.func,
  refetchGetPostFromFollowedUsers: PropTypes.func,
}

export default CreateComment
