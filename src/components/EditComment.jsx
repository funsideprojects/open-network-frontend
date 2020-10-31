import React, { useState, useRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { Input } from 'antd'

import { UPDATE_COMMENT } from 'graphql/comment'
import { getImageLink } from 'utils/image-link'

import { Button } from 'components/Form'
import { UploadImageIcon, DeleteIcon } from 'components/icons'

import noImage from 'assets/images/jpg/no-image.jpg'

import theme from 'theme'

const WrapperEditComment = styled.div`
  width: 260px;
`

const WrapperImagePreview = styled.div`
  position: relative;
  margin-top: 6px;
`

const BgImagePreview = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`

const GroupButtonTool = styled.div`
  display: flex;
  align-items: center;
`

const ButtonTool = styled.button`
  width: 32px;
  height: 32px;
  margin: 0px 3px;
  border-radius: 50%;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.4s;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`

const ImagePreview = styled.img`
  width: 100%;
  border-radius: 6px;
`

const StyledTextArea = styled(Input.TextArea)`
  border: 1px solid #ccc;
  margin-bottom: 3px;
  border-radius: 12px;
  box-shadow: 0 0 4px 1px #fff;
  transition: all 0.5s ease-in-out;
  resize: none;

  &:focus {
    box-shadow: 0 0 4px 1px #fff;
  }
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

const GroupButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
`

const CustomButton = styled(Button)`
  padding: 4px 16px;
  border-radius: 6px;
`

const EditComment = ({ comment, setIsEditing, refetchPost, refetchComments }) => {
  const client = useApolloClient()
  const inputRef = useRef()

  const [hasError, setHasError] = useState(false)
  const [image, setImage] = useState(null)
  const [isImageDeleted, setImageDeleted] = useState(false)

  const handlePostImageUpload = ({ target: { files } }) => {
    if (files.length) setImage(files[0])
  }

  const deleteImage = () => {
    if (image) setImage(null)
    else setImageDeleted(true)
  }

  const submitComment = async (e) => {
    e.preventDefault()
    const newComment = inputRef.current.state.value
    if ((!newComment || newComment.trim().length === 0) && !image) {
      setHasError(true)
      return inputRef.current.focus()
    }

    setHasError(false)
    return await client
      .mutate({
        mutation: UPDATE_COMMENT,
        variables: {
          input: {
            id: comment.id,
            comment: newComment,
            image: image,
            deleteImage: isImageDeleted,
          },
        },
      })
      .then(async () => {
        if (typeof refetchPost === 'function') await refetchPost()
        if (typeof refetchComments === 'function') await refetchComments()
        setIsEditing(false)
      })
      .catch((err) => console.log(err))
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') setIsEditing(false)
  }

  const onFocus = (e) => {
    const tempVal = e.target.value
    e.target.value = ''
    e.target.value = tempVal
  }

  const cancelEditing = () => {
    setIsEditing(false)
  }

  return (
    <WrapperEditComment>
      <StyledTextArea
        defaultValue={comment.comment}
        onKeyDown={onKeyDown}
        {...(hasError && {
          style: {
            border: `1px solid ${theme.colors.error.main}`,
            boxShadow: `0 0 4px 1px ${theme.colors.error.light}`,
          },
        })}
        onFocus={onFocus}
        ref={inputRef}
        autoSize={{ minRows: 1 }}
        autoFocus
      />
      <WrapperImagePreview>
        <ImagePreview
          src={
            image
              ? URL.createObjectURL(image)
              : isImageDeleted || !comment.image
              ? noImage
              : getImageLink(comment.image)
          }
        />
        <BgImagePreview>
          <GroupButtonTool>
            {(comment.image && !isImageDeleted) || image ? (
              <ButtonTool onClick={deleteImage}>
                <DeleteIcon />
              </ButtonTool>
            ) : (
              <Fragment />
            )}
            <ButtonTool>
              <InputFile
                id="message-image"
                type="file"
                accept="image/x-png,image/jpeg"
                onChange={handlePostImageUpload}
              />
              <Label htmlFor="message-image">
                <UploadImageIcon size={10} />
              </Label>
            </ButtonTool>
          </GroupButtonTool>
        </BgImagePreview>
      </WrapperImagePreview>

      <GroupButton>
        <CustomButton text type="button" onClick={cancelEditing}>
          Cancel
        </CustomButton>
        <CustomButton type="submit" onClick={submitComment}>
          Save
        </CustomButton>
      </GroupButton>
    </WrapperEditComment>
  )
}

EditComment.propTypes = {
  comment: PropTypes.object.isRequired,

  setIsEditing: PropTypes.func.isRequired,
  refetchPost: PropTypes.func,
  refetchComments: PropTypes.func,
}

export default EditComment
