import React, { memo, useState, useRef, useEffect, Fragment } from 'react'
import ContentLoader from 'react-content-loader'

import theme from 'theme'

export const UserSuggestionSkeleton = memo(() => {
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef('')

  useEffect(() => {
    return setContainerWidth(containerRef.current.offsetWidth)
  }, [])

  return (
    <div style={{ width: '100%', height: 270 }} ref={containerRef}>
      <ContentLoader
        width={containerWidth}
        height={270}
        viewBox={`0 0 ${containerWidth} ${270}`}
        speed={2}
        backgroundColor={theme.colors.skeleton.background}
        foregroundColor={theme.colors.skeleton.foreground}
      >
        <rect x='0' y='0' width={containerWidth} height='15' />

        {Array.from({ length: 5 })
          .fill(1)
          .map((e, i) => (
            <Fragment key={i}>
              <circle cx='15' cy={45 + i * 50} r='15' />
              <rect x='40' y={32 + i * 50} width='90' height='10' />
              <rect x='40' y={47 + i * 50} width='70' height='10' />
              <rect x={containerWidth - 30} y={35 + i * 50} width='30' height='20' />
            </Fragment>
          ))}
      </ContentLoader>
    </div>
  )
})
