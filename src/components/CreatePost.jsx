import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from '@apollo/client/react/components'
import styled from 'styled-components'
import { Select } from 'antd'

import { PublicIcon, PrivateIcon } from 'components/icons'
import Avatar from 'components/Avatar'
import { Button } from 'components/Form'
import ImagePreview from 'components/ImagePreview'
import { Spacing, Overlay, Container } from 'components/Layout'

import { MAX_POST_IMAGE_SIZE } from 'constants/ImageSize'

import { CREATE_POST } from 'graphql/post'

import { useAppNotification } from 'hooks/useAppNotification'

import PostImageUpload from 'pages/Home/PostImageUpload'

import { useStore } from 'store'

const Root = styled(Container)`
  border: 0;
  border-radius: ${(p) => p.theme.radius.lg};
  margin-top: ${(p) => p.theme.spacing.sm};
  box-shadow: ${(p) => p.theme.shadows.sm};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${(p) => p.theme.spacing.sm} 0;
`

const Textarea = styled.textarea`
  width: 100%;
  margin: 0 ${(p) => p.theme.spacing.xs};
  padding-left: ${(p) => p.theme.spacing.sm};
  padding-top: 8px;
  border: 1px solid ${(p) => p.theme.colors.border.main};
  outline: none;
  resize: none;
  transition: 0.1s ease-out;
  height: ${(p) => (p.focus ? '80px' : '40px')};
  font-size: ${(p) => p.theme.font.size.xs};
  background-color: ${(p) => p.theme.colors.grey[50]};
  border-radius: ${(p) => p.theme.radius.lg};
`

const ImagesPreviewContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  max-width: 100%;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px dashed #4d4d4d;
  background-color: #fff;
`

const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
  padding: ${(p) => p.theme.spacing.sm} 0;
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const CustomButton = styled(Button)`
  padding: 6px 12px;
  border-radius: 6px;
`

const StyledSelect = styled(Select)`
  margin-left: 5px;
  border: none;

  .ant-select-selector {
    outline: none;
    height: 100% !important;
    border-radius: ${(p) => p.theme.radius.lg} !important;
    border-color: ${(p) => p.theme.colors.grey[300]} !important;
    box-shadow: 0 0 0 2px #fff !important;

    &:hover {
      border-color: ${(p) => p.theme.colors.grey[300]} !important;
      box-shadow: 0 0 0 2px ${(p) => p.theme.colors.grey[200]} !important;
    }

    &:focus {
      box-shadow: 0 0 0 2px ${(p) => p.theme.colors.grey[200]} !important;
    }

    input {
      height: 100% !important;
    }

    > .ant-select-selection-item {
      line-height: 40px !important;
    }
  }
`

const PrivacySelectionText = styled.span`
  margin-left: 8px;
`

const CreatePost = ({ getUserPosts = false, getPostsFromFollowedUsers = false }) => {
  const [{ auth }] = useStore()
  const [title, setTitle] = useState('')
  const [images, setImages] = useState([])
  const [isPrivate, setIsPrivate] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef(null)

  const message = useAppNotification()

  const handleReset = () => {
    setTitle('')
    setImages([])
    setIsPrivate(false)
    setIsFocused(false)
  }

  const handleOnFocus = () => setIsFocused(true)

  const handlePostImageUpload = (e) => {
    const { files } = e.target

    if (!files.length) return

    const imagesArray = [...images]

    Array.from(files).forEach((file) => {
      imagesArray.push(file)
      if (file.size >= MAX_POST_IMAGE_SIZE) {
        message.error(`File size should be less then ${MAX_POST_IMAGE_SIZE / 1000000}MB`)
      }
    })

    setImages(imagesArray)

    if (!isFocused) setIsFocused(true)

    e.target.value = null
  }

  const deleteImage = (index) => setImages(images.filter((_img, i) => i !== index))

  const handleTitleChange = (e) => setTitle(e.target.value)

  const handleSubmit = async (e, createPost) => {
    e.preventDefault()
    await createPost()
      .then(() => {
        handleReset()
      })
      .catch(() => {})
  }

  useEffect(() => {
    return () => {
      handleReset()
    }
  }, [])

  return (
    <Mutation
      mutation={CREATE_POST}
      variables={{ input: { title, ...(images.length ? { images } : {}), isPrivate } }}
      refetchQueries={() => [
        ...(getUserPosts ? [`getUserPosts`] : []),
        ...(getPostsFromFollowedUsers ? [`getPostsFromFollowedUsers`] : []),
      ]}
    >
      {(createPost, { loading }) => {
        const isShareDisabled = loading || (!loading && !images.length && !title)

        return (
          <>
            {isFocused && <Overlay onClick={() => setIsFocused(false)} />}

            <Root zIndex={isFocused ? 'md' : 'xs'} color="white" radius="sm" padding="sm">
              <form onSubmit={(e) => handleSubmit(e, createPost)}>
                <Wrapper>
                  <Avatar image={auth.user.image} size={40} />

                  <Textarea
                    ref={inputRef}
                    type="textarea"
                    name="title"
                    {...(isFocused && { style: { marginRight: 0 } })}
                    focus={isFocused}
                    value={title}
                    onFocus={handleOnFocus}
                    onChange={handleTitleChange}
                    placeholder="Add a post"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsFocused(false)
                        inputRef.current.blur()
                      }
                    }}
                  />

                  {!isFocused && <PostImageUpload handleChange={handlePostImageUpload} />}
                </Wrapper>

                {!!images.length && isFocused && (
                  <Spacing bottom="sm">
                    <ImagesPreviewContainer>
                      {images?.map((image, index) => {
                        return <ImagePreview key={index} image={image} index={index} deleteImage={deleteImage} />
                      })}
                    </ImagesPreviewContainer>
                  </Spacing>
                )}

                {isFocused && (
                  <Options>
                    <ButtonGroup>
                      <PostImageUpload label="Photo" handleChange={handlePostImageUpload} />

                      <StyledSelect value={isPrivate} onChange={(selected) => setIsPrivate(selected)}>
                        <Select.Option value={false}>
                          <PublicIcon />
                          <PrivacySelectionText>Everyone</PrivacySelectionText>
                        </Select.Option>
                        <Select.Option value={true}>
                          <PrivateIcon />
                          <PrivacySelectionText>Only Me</PrivacySelectionText>
                        </Select.Option>
                      </StyledSelect>
                    </ButtonGroup>

                    <ButtonGroup>
                      <CustomButton text type="button" onClick={handleReset}>
                        Cancel
                      </CustomButton>
                      <CustomButton disabled={isShareDisabled} type="submit">
                        Share
                      </CustomButton>
                    </ButtonGroup>
                  </Options>
                )}
              </form>
            </Root>
          </>
        )
      }}
    </Mutation>
  )
}

CreatePost.propTypes = {
  getUserPosts: PropTypes.bool,
  getPostsFromFollowedUsers: PropTypes.bool,
}

export default CreatePost
