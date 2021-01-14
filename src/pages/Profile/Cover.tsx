import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { useMutation } from '@apollo/client'
import { CloudUpload } from '@styled-icons/ionicons-outline/CloudUpload'
import { Trash } from '@styled-icons/ionicons-outline/Trash'

import { Button } from 'components/Form'
import { MAX_USER_COVER_IMAGE_SIZE } from 'constants/ImageSize'
import { UPDATE_USER_PHOTO } from 'graphql/user'
import { authAtoms } from 'store'
import { getImageLink } from 'utils/image-link'

import defaultCoverImage from 'assets/images/background-desktop.png'

const Container = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 340px;
  position: relative;
  box-shadow: ${(props) => props.theme.shadows.sm};
  border-radius: ${(props) => props.theme.radius.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  background-image: url(${(props) => props.imageUrl ?? defaultCoverImage});
  background-size: cover;
  background-position: center;
`

const Options = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing.sm};
  right: ${(props) => props.theme.spacing.sm};
  display: flex;
  flex-flow: row nowrap;

  > button,
  label {
    margin-right: ${(props) => props.theme.spacing.xs};

    &:last-child {
      margin-right: 0;
    }
  }
`

const ButtonDelete = styled(Button)`
  color: ${(props) => props.theme.colors.primary.main};
  background: ${(props) => props.theme.opacityToHex(0.9)};

  &:hover {
    background: ${(props) => props.theme.colors.danger.main};
  }
`

const ButtonUpload = styled.label`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.md};
  padding: ${(props) => props.theme.spacing.xxs} ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.primary.main};
  background: ${(props) => props.theme.opacityToHex(0.9)};
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.primary.light};
  }
`

const Input = styled.input`
  display: none;
`

const SCITrash = styled(Trash)``

const imageTypes = ['image/gif', 'image/jpeg', 'image/png']

const Component = ({ isAuthUser, coverImage }: Props) => {
  const setAuthUser = useSetRecoilState(authAtoms.userState)
  const [updatePhoto, { loading, data }] = useMutation(UPDATE_USER_PHOTO)

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    // ? Reset input value either successful or failure case
    event.target.value = ''

    if (file) {
      if (file.size <= MAX_USER_COVER_IMAGE_SIZE) {
        updatePhoto({ variables: { input: { image: file, isCover: true } } })
      } else {
        // message.error(`File size should be less then ${MAX_USER_COVER_IMAGE_SIZE / 1000000}MB`)
      }
    }
  }

  const handleDeleteImage = () => {
    updatePhoto({ variables: { input: { isCover: true } } })
  }

  React.useEffect(() => {
    if (data?.updateUserPhoto) {
      setAuthUser({ user: data.updateUserPhoto })
    }
  }, [data, setAuthUser])

  return (
    <Container imageUrl={getImageLink(coverImage)} onContextMenu={(event) => event.preventDefault()}>
      {isAuthUser && (
        <Options>
          {coverImage && (
            <ButtonDelete
              buttonType="danger"
              title="Remove cover image"
              icon={SCITrash}
              loading={coverImage && loading}
              onClick={handleDeleteImage}
            />
          )}

          <ButtonUpload title={`${coverImage ? 'Replace' : 'Upload'} cover image`}>
            <Input
              name="coverImage"
              type="file"
              disabled={loading}
              onChange={handleUploadImage}
              accept={imageTypes.join(',')}
            />
            <CloudUpload />
          </ButtonUpload>
        </Options>
      )}
    </Container>
  )
}

const componentPropTypes = {
  isAuthUser: PropTypes.bool.isRequired,
  coverImage: PropTypes.string,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default React.memo(Component)
