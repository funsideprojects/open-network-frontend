import React from 'react'
import theme from 'theme'

/**
 * Dots icon
 *
 * @param {string} width
 * @param {string} color
 */
export const DotsIcon = ({ width = '17', color }) => {
  return (
    <svg
      width={width}
      fill={theme.colors[color] || theme.colors.text.primary}
      viewBox='0 0 612 612'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='69.545' cy='306' r='69.545' />
      <circle cx='306' cy='306' r='69.545' />
      <circle cx='542.455' cy='306' r='69.545' />
    </svg>
  )
}
