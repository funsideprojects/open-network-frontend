import React from 'react'
import PropTypes from 'prop-types'
import { LockFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'

import theme from 'theme'

/**
 * Private icon
 *
 * @param {string} withTooltip
 * @param {string} width
 * @param {string} color
 */
export const PrivateIcon = ({ withTooltip = '', width = 13, color }) => {
  const iconProps = {
    style: {
      color: theme.colors[color] || theme.colors.text.secondary,
      fontSize: `${width}px`,
    },
  }

  if (withTooltip) {
    return (
      <Tooltip title={withTooltip}>
        <LockFilled {...iconProps} />
      </Tooltip>
    )
  }
  return <LockFilled {...iconProps} />
}

PrivateIcon.propTypes = {
  withTooltip: PropTypes.string,
  width: PropTypes.number,
  color: PropTypes.string,
}
