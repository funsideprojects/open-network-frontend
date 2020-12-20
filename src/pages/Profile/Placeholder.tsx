import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import ContentLoader from 'react-content-loader'

import theme from 'theme'

const Placeholder = () => {
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <ContentLoader
          viewBox="0 0 50 40"
          height={500}
          width={width}
          backgroundColor={theme.colors.primary.grey}
          foregroundColor={theme.colors.primary.light}
          speed={1.5}
          interval={0.5}
          title="Loading..."
        >
          <rect x="1" y="1" rx="1.5" ry="1.5" width="48" height="18" />
          <circle cx="25" cy="18" r="5" />

          <rect x="17" y="24" rx="0.75" ry="0.75" width="16" height="2" />

          <rect x="12" y="27" rx="0.25" ry="0.25" width="6" height="1" />
          <rect x="19" y="27" rx="0.25" ry="0.25" width="19" height="1" />
          <rect x="12" y="29" rx="0.25" ry="0.25" width="10" height="1" />
          <rect x="23" y="29" rx="0.25" ry="0.25" width="15" height="1" />
          <rect x="12" y="31" rx="0.25" ry="0.25" width="8" height="1" />
          <rect x="21" y="31" rx="0.25" ry="0.25" width="8" height="1" />
          <rect x="30" y="31" rx="0.25" ry="0.25" width="8" height="1" />
        </ContentLoader>
      )}
    </AutoSizer>
  )
}

export default Placeholder
