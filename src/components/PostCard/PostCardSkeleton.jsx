import React, { useEffect, useState, useRef, memo } from 'react'
import ContentLoader from 'react-content-loader'

import theme from 'theme'

const PostCardSkeleton = memo(() => {
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef('')

  useEffect(() => {
    return setContainerWidth(containerRef.current.offsetWidth)
  }, [])

  return (
    <div
      style={{
        marginTop: 20,
        background: `${theme.colors.white}`,
        width: '100%',
        borderRadius: '12px',
        height: 400,
      }}
      ref={containerRef}
    >
      <ContentLoader
        speed={2}
        width={containerWidth}
        height={400}
        viewBox={`0 0 ${containerWidth} ${400}`}
        backgroundColor={theme.colors.skeleton.background}
        foregroundColor={theme.colors.skeleton.foreground}
      >
        <circle cx='34' cy='34' r='15' />
        <rect x='64' y='20' width='100' height='10' />
        <rect x='64' y='35' width='20' height='10' />
        <rect x='104' y='35' width='45' height='10' />

        <rect x='20' y='75' width={`${Math.abs(containerWidth - 44)}`} height='13' />
        <rect x='20' y='93' width={`${Math.abs(containerWidth - 44)}`} height='13' />
        <rect x='20' y='111' width={`${Math.abs(containerWidth - 94)}`} height='13' />

        <rect x='20' y='139' width={`${Math.abs(containerWidth - 44)}`} height='210' />

        <rect x='20' y='359' width={`${Math.abs(containerWidth - 44)}`} height='2' />
        <rect x='20' y='369' width={`${Math.abs(containerWidth - 44)}`} height='20' />
      </ContentLoader>
    </div>
  )
})

export default PostCardSkeleton
