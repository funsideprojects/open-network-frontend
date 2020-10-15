import React, { memo, useState, useRef, useEffect } from 'react'
import ContentLoader from 'react-content-loader'

import theme from 'theme'

export const PostTitleSkeleton = memo(() => {
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef('')

  useEffect(() => {
    return setContainerWidth(containerRef.current.offsetWidth)
  }, [])

  return (
    <div style={{ width: '100%', height: 20 }} ref={containerRef}>
      <ContentLoader
        width={containerWidth}
        height={20}
        viewBox={`0 0 ${containerWidth} ${20}`}
        speed={2}
        backgroundColor={theme.colors.skeleton.background}
        foregroundColor={theme.colors.skeleton.foreground}
      >
        <rect x='0' y='0' width={containerWidth} height='15' />
      </ContentLoader>
    </div>
  )
})
