import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { UploadImageIcon } from 'components/icons'
import { Loading } from 'components/Loading'

import { MAX_USER_COVER_IMAGE_SIZE } from 'constants/ImageSize'

import { UPDATE_USER_PHOTO } from 'graphql/user'

import { useStore } from 'store'

import { useAppNotification } from 'hooks/useAppNotification'

import { getImageLink } from 'utils/image-link'

import defaultBackgroundImage from './background.jpg'

const Root = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  background-image: url(${(p) => (p.image ? p.image : defaultBackgroundImage)});
  background-size: cover;
  background-position: center;
  border-bottom-left-radius: ${(p) => p.theme.radius.md};
  border-bottom-right-radius: ${(p) => p.theme.radius.md};
  box-shadow: ${(p) => p.theme.shadows.sm};
`

const Input = styled.input`
  display: none;
`

const Label = styled.label`
  width: 36px;
  height: 32px;
  position: absolute;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  left: ${(p) => p.theme.spacing.sm};
  top: ${(p) => p.theme.spacing.sm};
  padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
  border-radius: ${(p) => p.theme.radius.sm};
  transition: background-color 0.4s;
  background-color: rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`

const StyledButton = styled(Button)`
  position: absolute;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  left: ${(p) => p.theme.spacing.sm};
  top: 60px;
  padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
  border-radius: ${(p) => p.theme.radius.sm};
  transition: background-color 0.4s;
`

/**
 * Displays and Updates user Cover image
 */
const ProfileCoverUpload = ({ username, coverImage, userId }) => {
  const client = useApolloClient()
  const [{ auth }] = useStore()

  const [loading, setLoading] = useState(false)

  const message = useAppNotification()

  const handleImageChange = async (e) => {
    setLoading(true)

    const file = e.target.files[0]
    e.target.value = ''

    if (!file) return

    if (file.size >= MAX_USER_COVER_IMAGE_SIZE) {
      message.error(`File size should be less then ${MAX_USER_COVER_IMAGE_SIZE / 1000000}MB`)
      setLoading(false)
      return
    }

    try {
      await client.mutate({
        mutation: UPDATE_USER_PHOTO,
        variables: { input: { image: file, isCover: true } },
        refetchQueries: () => [`getUser`, ...(auth.user.username === username ? [`getAuthUser`] : [])],
      })
    } catch (err) {
      message.error(err.graphQLErrors[0].message)
    }

    setLoading(false)
  }

  const handleDeleteCover = async () => {
    try {
      await client.mutate({
        mutation: UPDATE_USER_PHOTO,
        variables: { input: { image: null, isCover: true } },
        refetchQueries: () => [`getUser`, ...(auth.user.username === username ? [`getAuthUser`] : [])],
      })
    } catch (err) {
      message.error(err.graphQLErrors[0].message)
    }
  }

  return (
    <Root image={getImageLink(coverImage)}>
      <Input
        name='coverImage'
        type='file'
        id='coverImage'
        onChange={handleImageChange}
        accept='image/x-png,image/jpeg'
      />

      {loading && <Loading top='xl' size='xl' />}

      {auth.user.id === userId && (
        <>
          <Label htmlFor='coverImage'>
            <UploadImageIcon width='14' color='white' />
          </Label>

          {coverImage && (
            <StyledButton type='danger' onClick={handleDeleteCover}>
              <DeleteOutlined />
            </StyledButton>
          )}
        </>
      )}
    </Root>
  )
}

ProfileCoverUpload.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  coverImage: PropTypes.string,
}

export default ProfileCoverUpload
