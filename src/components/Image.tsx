import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Loading from 'components/Loading'

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img<{ visible: boolean }>`
  display: block;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: 0.3s;
`

const ImageComponent = React.forwardRef<HTMLImageElement, Props>(({ src, alt, ...restProps }, forwardedRef) => {
  const [imgLoaded, setImgLoaded] = React.useState(false)

  React.useEffect(() => {
    const imgLoader = new Image()
    imgLoader.src = src
    imgLoader.onload = () => {
      setImgLoaded(true)
    }
  }, [src])

  return (
    <>
      {!imgLoaded ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : (
        <></>
      )}
      <Img {...restProps} src={src} alt={alt} ref={forwardedRef} visible={imgLoaded} />
    </>
  )
})

ImageComponent.displayName = 'Image'

const componentPropTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.any.isRequired,
}

ImageComponent.propTypes = componentPropTypes
type Props = Omit<JSX.IntrinsicElements['img'], 'ref'> & PropTypes.InferProps<typeof componentPropTypes>

export default ImageComponent
