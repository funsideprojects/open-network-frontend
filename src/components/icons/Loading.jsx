import React from 'react'
import PropTypes from 'prop-types'
import { Loading3QuartersOutlined } from '@ant-design/icons'

import theme from 'theme'

/**
 * Private icon
 *
 * @param {string} withTooltip
 * @param {string} width
 * @param {string} color
 */
export const LoadingIcon = ({ width = 14, color = theme.colors.text.secondary }) => {
  const iconProps = {
    style: { color, fontSize: `${width}px` },
    spin: true,
  }

  return <Loading3QuartersOutlined {...iconProps} />
}

LoadingIcon.propTypes = {
  width: PropTypes.number,
  color: PropTypes.string,
}
