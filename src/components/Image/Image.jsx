import React, { memo, useState, useRef, useEffect, useCallback, Fragment } from 'react'
import PropTypes from 'prop-types'

const Img = memo(({ src, alt = 'Image', ...props }) => {
  const [width, setWidth] = useState(0)
  const [isInViewport, setIsInViewport] = useState(false)
  const [lqipLoaded, setLqipLoaded] = useState(false)
  const [fullsizeLoaded, setFullsizeLoaded] = useState(false)
  const imgRef = useRef(null)

  const handleViewport = useCallback(() => {
    // Only run if the image has not already been loaded
    if (imgRef.current && !lqipLoaded) {
      // Get the viewport height
      const windowHeight = window.innerHeight
      // Get the top position of the <figure /> element
      const imageTopPosition = imgRef.current.getBoundingClientRect().top
      // Multiply the viewport * buffer (default buffer: 1.5)
      const buffer = 1.5
      // If <figure /> is in viewport
      if (windowHeight * buffer > imageTopPosition) {
        setIsInViewport(true)
      }
    }
  }, [lqipLoaded])

  const setImageFullSizeLoadedOnImageLoad = () => setFullsizeLoaded(true)

  const setLqipLoadedOnImageLoad = () => setLqipLoaded(true)

  useEffect(() => setWidth(imgRef.current.clientWidth), [])

  useEffect(() => handleViewport(), [handleViewport])

  useEffect(() => {
    window.addEventListener('scroll', handleViewport)

    return () => window.removeEventListener('scroll', handleViewport)
  }, [handleViewport])

  return (
    <figure
      ref={this.imgRef}
      style={{
        position: 'relative',
        margin: 0,
      }}
    >
      {isInViewport && width > 0 ? (
        <Fragment>
          <img
            src={src}
            alt={alt}
            onLoad={setImageFullSizeLoadedOnImageLoad}
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              transition: 'all 0.5s ease-in',
            }}
          />
          <img
            src={src}
            alt={alt}
            onLoad={setLqipLoadedOnImageLoad}
            style={{
              width: '100%',
              filter: 'blur(5px)',
              opacity: fullsizeLoaded ? 0 : 1,
              transition: 'all 0.5s ease-in',
            }}
          />
        </Fragment>
      ) : null}
    </figure>
  )
})

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

export default Img
