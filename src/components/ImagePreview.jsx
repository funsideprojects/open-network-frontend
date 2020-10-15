import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DeleteOutlined } from '@ant-design/icons'

const ImagePreviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(p) => p.width + 'px'};
  height: ${(p) => p.height + 'px'};
  padding: 6px 0px;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 6px;
  transition: all 0.4s;
  margin-left: 6px;

  &:hover {

    > button {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Image = styled.img`
  border-radius: 4px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ButtonDelete = styled.button`
  cursor: pointer;
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border: 1px dashed rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  opacity: 0;
  transition: all 0.2s ease-in;

  &:focus {
    outline: none;
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.8);
  }
`

const ImagePreview = ({ image, index, deleteImage, width = 150, height = 150 }) => {
  const onClick = (e) => {
    e.preventDefault()
    deleteImage(index)
  }

  return (
    <ImagePreviewContainer width={width} height={height} >
      <Image src={URL.createObjectURL(image)} />
      <ButtonDelete htmlType='button' onClick={onClick}>
        <DeleteOutlined />
      </ButtonDelete>
    </ImagePreviewContainer>
  )
}

ImagePreview.propTypes = {
  image: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,

  deleteImage: PropTypes.func.isRequired,
}

export default ImagePreview
