import React, { useEffect, useState, useRef, memo } from 'react'
import ContentLoader from 'react-content-loader'

const CommentSkeleton = memo(() => {
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef('')

  useEffect(() => {
    return setContainerWidth(containerRef.current.offsetWidth)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: 110,
        padding: '10px 0px'
      }}
      ref={containerRef}
    >
      <ContentLoader
        speed={2}
        width={containerWidth}
        height={80}
        viewBox={`0 0 ${containerWidth} ${80}`}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <circle cx='34' cy='20' r='15' />
        <rect x='64' y='17' width={`${Math.abs(containerWidth - 84)}`} height='10' />

        <circle cx='34' cy='60' r='15' />
        <rect x='64' y='47' width='90' height='10' />
        <rect x='64' y='62' width={`${Math.abs(containerWidth - 84)}`} height='10' />
      </ContentLoader>
    </div>
  )
})

export default CommentSkeleton
