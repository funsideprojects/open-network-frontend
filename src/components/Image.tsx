import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Close } from '@styled-icons/ionicons-solid/Close'

import { LoadingIndicator } from 'components/Loading'

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SCIClose = styled(Close)`
  color: ${(props) => props.theme.colors.error.main};
`

const Img = styled.img<{ visible: boolean }>`
  display: block;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: 0.3s;
`

enum ImgStatus {
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}

const ImageComponent = React.forwardRef<HTMLImageElement, Props>(({ src, ...restProps }, forwardedRef) => {
  const [imgStatus, setImgStatus] = React.useState<ImgStatus>(ImgStatus.Loading)

  React.useEffect(() => {
    const imgLoader = new Image()
    imgLoader.src = src
    imgLoader.onload = () => {
      setImgStatus(ImgStatus.Loaded)
    }
    imgLoader.onerror = () => {
      setImgStatus(ImgStatus.Error)
    }
  }, [src])

  return [ImgStatus.Loading, ImgStatus.Error].indexOf(imgStatus) > -1 ? (
    <Container>{imgStatus === ImgStatus.Loading ? <LoadingIndicator /> : <SCIClose />}</Container>
  ) : (
    <Img {...restProps} ref={forwardedRef} src={src} visible={imgStatus === ImgStatus.Loaded} />
  )
})

ImageComponent.displayName = 'Image'

const componentPropTypes = {
  src: PropTypes.any.isRequired,
}

ImageComponent.propTypes = componentPropTypes
type Props = Omit<JSX.IntrinsicElements['img'], 'ref'> & PropTypes.InferProps<typeof componentPropTypes>

export default ImageComponent
