import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel'

import { getImageLink } from 'utils/image-link'

const ImageContainer = styled.div`
  height: 460px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  display: block;
  object-fit: cover;
  cursor: pointer;
`

const PostPopupImages = ({ images = [] }) => {
  if (!images.length) return null

  return (
    <Carousel showThumbs={false} showIndicators={images.length > 1} showStatus={images.length > 1}>
      {images.map((image, i) => (
        <ImageContainer key={i}>
          <Image width='100%' src={getImageLink(image.image)} alt={i.toString()} />
        </ImageContainer>
      ))}
    </Carousel>
  )
}

PostPopupImages.propTypes = {
  images: PropTypes.array,

  openModal: PropTypes.func,
}

export default PostPopupImages
