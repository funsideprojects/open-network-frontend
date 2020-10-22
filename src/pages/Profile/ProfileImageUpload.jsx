import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'

import { Loading } from 'components/Loading'
import { UserIcon } from 'components/icons'

import { UPDATE_USER_PHOTO } from 'graphql/user'

import { MAX_USER_PROFILE_IMAGE_SIZE } from 'constants/ImageSize'

import { useAppNotification } from 'hooks/useAppNotification'

import { useStore } from 'store'

import { getImageLink } from 'utils/image-link'

const Input = styled.input`
  display: none;
`

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  visibility: hidden;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: ${(p) => p.theme.colors.white};
  opacity: 0;
  transition: visibility 0.2s linear, opacity 0.2s linear;
`

const Label = styled.label`
  user-select: none;
  position: relative;
  width: 180px;
  height: 180px;
  display: block;
  overflow: hidden;
  cursor: ${(p) => p.authUser && 'pointer'};
  border-radius: 50%;
  border: 4px solid ${(p) => p.theme.colors.border.main};
  background-color: ${(p) => p.theme.colors.white};

  &:hover ${Overlay} {
    opacity: 1;
    visibility: visible;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

/**
 * Displays and Updates user profile image
 */
const ProfileImageUpload = ({ username, userId, image, getUserPosts = false }) => {
  const client = useApolloClient()
  const [{ auth }] = useStore()
  const [loading, setLoading] = useState(false)

  const message = useAppNotification()

  const handleImageChange = async (e) => {
    setLoading(true)

    const file = e.target.files[0]
    e.target.value = ''

    if (!file) return

    if (file.size >= MAX_USER_PROFILE_IMAGE_SIZE) {
      setLoading(false)
      message.error(`File size should be less then ${MAX_USER_PROFILE_IMAGE_SIZE / 1000000}MB`)
      return
    }

    try {
      await client.mutate({
        mutation: UPDATE_USER_PHOTO,
        variables: { input: { image: file, isCover: false } },
        refetchQueries: () => [
          `getUser`,
          ...(auth.user.username === username ? [`getAuthUser`] : []),
          ...(getUserPosts ? [`getUserPosts`] : []),
        ],
      })
    } catch (err) {
      message.error(err.graphQLErrors[0].message)
    }

    setLoading(false)
  }

  const renderProfileImage = () => {
    if (loading) return <Loading top='xl' />

    return image ? (
      <Image src={getImageLink(image)} alt='profile' accept='image/x-png,image/jpeg' />
    ) : (
      <UserIcon width='172' />
    )
  }

  const authUser = auth.user.id === userId

  return (
    <>
      {authUser && (
        <Input name='image' type='file' id='image' accept='image/x-png,image/jpeg' onChange={handleImageChange} />
      )}

      <Label authUser={authUser} htmlFor='image'>
        {authUser && <Overlay>{image ? 'Update' : 'Upload'}</Overlay>}

        {renderProfileImage()}
      </Label>
    </>
  )
}

ProfileImageUpload.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  image: PropTypes.string,

  getUserPosts: PropTypes.bool,
}

export default ProfileImageUpload
