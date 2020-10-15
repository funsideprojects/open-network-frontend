import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

import theme from 'theme'

/**
 * Public icon
 *
 * @param {string} withTooltip
 * @param {string} width
 * @param {string} color
 */
export const PublicIcon = ({ withTooltip = '', width = 13, color = theme.colors.text.secondary }) => {
  const iconProps = {
    style: {
      color: theme.colors[color] || theme.colors.text.secondary,
      fontSize: `${width}px`,
    },
  }

  if (withTooltip) {
    return (
      <Tooltip title={withTooltip}>
        <GlobalOutlined {...iconProps} />
      </Tooltip>
    )
  }
  return <GlobalOutlined {...iconProps} />
}

PublicIcon.propTypes = {
  withTooltip: PropTypes.string,
  width: PropTypes.number,
  color: PropTypes.string,
}
