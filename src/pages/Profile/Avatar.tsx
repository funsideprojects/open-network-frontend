import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { useMutation } from '@apollo/client'
import { CloudUpload } from '@styled-icons/ionicons-outline/CloudUpload'
import { Trash } from '@styled-icons/ionicons-outline/Trash'

import { LoadingIndicator } from 'components/Loading'
import { Button } from 'components/Form'
import { MAX_USER_PROFILE_IMAGE_SIZE } from 'constants/ImageSize'
import { UPDATE_USER_PHOTO } from 'graphql/user'
import { authAtoms } from 'store'
import { getImageLink } from 'utils/image-link'

import defaultAvatarImage from 'assets/images/default-avatar.svg'

const Container = styled.div`
  width: 180px;
  height: 180px;
  position: absolute;
  top: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.round};
  padding: ${(props) => props.theme.spacing.xs};
  background: ${(props) => props.theme.colors.grey[200]};
`

const Image = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 100%;
  box-shadow: ${(props) => props.theme.shadows.sm};
  border-radius: ${(props) => props.theme.radius.round};
  background-image: url(${(props) => props.imageUrl ?? defaultAvatarImage});
  background-size: cover;
  background-position: center;
`

const AbsoluteContainer = styled.div`
  width: calc(100% - ${(props) => parseInt(props.theme.spacing.xs, 10) * 2}px);
  height: calc(100% - ${(props) => parseInt(props.theme.spacing.xs, 10) * 2}px);
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.round};
  background: ${(props) => props.theme.opacityToHex(0.4)};
`

const Options = styled(AbsoluteContainer)`
  align-items: unset;
  background: ${(props) => props.theme.opacityToHex(0)};
  opacity: 0;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`

const Option = styled.div`
  cursor: pointer;
  display: flex;
  flex: 1;

  svg {
    width: 24px;
    height: 24px;
  }
`

const ButtonDelete = styled(Button)`
  width: 100%;
  border-radius: 0;
  background: ${(props) => props.theme.opacityToHex(0.1)};

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.opacityToHex(0.7, props.theme.colors.danger.main)};
  }
`

const ButtonUpload = styled.label`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.primary.main};
  background: ${(props) => props.theme.opacityToHex(0.1)};
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.opacityToHex(0.7, props.theme.colors.primary.main)};
  }
`

const Input = styled.input`
  display: none;
`

const imageTypes = ['image/gif', 'image/jpeg', 'image/png']

const Component = ({ isAuthUser, image }: Props) => {
  const setAuthUser = useSetRecoilState(authAtoms.userState)
  const [updatePhoto, { loading, data }] = useMutation(UPDATE_USER_PHOTO)

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    // ? Reset input value either successful or failure case
    event.target.value = ''

    if (file) {
      if (file.size <= MAX_USER_PROFILE_IMAGE_SIZE) {
        updatePhoto({ variables: { input: { image: file } } })
      } else {
        // message.error(`File size should be less then ${MAX_USER_COVER_IMAGE_SIZE / 1000000}MB`)
      }
    }
  }

  const handleDeleteImage = () => {
    updatePhoto({ variables: { input: {} } })
  }

  React.useEffect(() => {
    if (data?.updateUserPhoto) {
      setAuthUser({ user: data.updateUserPhoto })
    }
  }, [data, setAuthUser])

  return (
    <Container>
      <Image imageUrl={getImageLink(image)} onContextMenu={(event) => event.preventDefault()} />

      {loading ? (
        <AbsoluteContainer>
          <LoadingIndicator large />
        </AbsoluteContainer>
      ) : (
        isAuthUser && (
          <Options>
            {image && (
              <Option>
                <ButtonDelete
                  title="Remove avatar image"
                  onClick={handleDeleteImage}
                  onContextMenu={(event) => event.preventDefault()}
                >
                  <Trash />
                </ButtonDelete>
              </Option>
            )}

            <Option>
              <ButtonUpload
                title={`${image ? 'Replace' : 'Upload'} avatar image`}
                onContextMenu={(event) => event.preventDefault()}
              >
                <Input name="coverImage" type="file" onChange={handleUploadImage} accept={imageTypes.join(',')} />
                <CloudUpload />
              </ButtonUpload>
            </Option>
          </Options>
        )
      )}
    </Container>
  )
}

const componentPropTypes = {
  isAuthUser: PropTypes.bool.isRequired,
  image: PropTypes.string,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default React.memo(Component)
