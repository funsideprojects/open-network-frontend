import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { UploadImageIcon } from 'components/icons'

const Input = styled.input`
  display: none;
`

const Label = styled.label`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.grey[100]};

  &:hover {
    background-color: ${(p) => p.theme.colors.grey[300]};
  }
`

/**
 * Component for uploading post image
 */
const PostImageUpload = ({ handleChange, label }) => (
  <>
    <Input id='post-image' name='image' onChange={handleChange} type='file' multiple accept='image/x-png,image/jpeg' />

    <Label htmlFor='post-image'>
      <UploadImageIcon />
    </Label>
  </>
)

PostImageUpload.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
}

export default PostImageUpload
