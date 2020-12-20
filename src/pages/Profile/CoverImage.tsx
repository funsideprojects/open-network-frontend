import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { useApolloClient } from '@apollo/client'

// import { MAX_USER_COVER_IMAGE_SIZE } from 'constants/ImageSize'
// import { UPDATE_USER_PHOTO } from 'graphql/user'
import { getImageLink } from 'utils/image-link'

import defaultCoverImage from 'assets/images/background-desktop.png'

const Container = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 350px;
  position: relative;
  background-image: url(${(props) => props.imageUrl ?? defaultCoverImage});
  background-size: cover;
  background-position: center;
  box-shadow: ${(props) => props.theme.shadows.sm};
  border-radius: ${(props) => props.theme.radius.lg};
`

const Input = styled.input`
  display: none;
`

// const Label = styled.label`
//   cursor: pointer;
//   width: 36px;
//   height: 32px;
//   overflow: hidden;
//   position: absolute;
//   top: ${(p) => p.theme.spacing.sm};
//   left: ${(p) => p.theme.spacing.sm};
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   border-radius: ${(p) => p.theme.radius.sm};
//   padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
//   transition: background-color 0.4s;
//   background-color: rgba(0, 0, 0, 0.6);

//   &:hover {
//     background-color: rgba(0, 0, 0, 0.8);
//   }
// `

const Component = ({ coverImage }: Props) => {
  // const client = useApolloClient()

  // const [loading, setLoading] = useState(false)

  // const handleImageChange = async (e) => {
  //   setLoading(true)

  //   const file = e.target.files[0]
  //   e.target.value = ''

  //   if (!file) return

  //   if (file.size >= MAX_USER_COVER_IMAGE_SIZE) {
  //     message.error(`File size should be less then ${MAX_USER_COVER_IMAGE_SIZE / 1000000}MB`)
  //     setLoading(false)
  //     return
  //   }

  //   try {
  //     await client.mutate({
  //       mutation: UPDATE_USER_PHOTO,
  //       variables: { input: { image: file, isCover: true } },
  //       refetchQueries: () => [`getUser`, ...(auth.user.username === username ? [`getAuthUser`] : [])],
  //     })
  //   } catch (err) {
  //     message.error(err.graphQLErrors[0].message)
  //   }

  //   setLoading(false)
  // }

  // const handleDeleteCover = async () => {
  //   try {
  //     await client.mutate({
  //       mutation: UPDATE_USER_PHOTO,
  //       variables: { input: { image: null, isCover: true } },
  //       refetchQueries: () => [`getUser`, ...(auth.user.username === username ? [`getAuthUser`] : [])],
  //     })
  //   } catch (err) {
  //     message.error(err.graphQLErrors[0].message)
  //   }
  // }

  return (
    <Container imageUrl={getImageLink(coverImage)}>
      {/* {auth.user.id === userId && (
        <React.Fragment>
          <Input
            id="coverImage"
            name="coverImage"
            type="file"
            // onChange={handleImageChange}
            accept="image/x-png,image/jpeg"
          />
          <Label htmlFor="coverImage">
            <UploadImageIcon width="14" color="white" />
          </Label>

          {coverImage && (
            <StyledButton type="danger" onClick={handleDeleteCover}>
              <DeleteOutlined />
            </StyledButton>
          )}
        </React.Fragment>
      )} */}
    </Container>
  )
}

const componentPropTypes = {
  // username: PropTypes.string.isRequired,
  // userId: PropTypes.string.isRequired,
  coverImage: PropTypes.string,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Component
