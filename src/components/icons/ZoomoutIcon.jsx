import React from 'react'
import theme from 'theme'

/**
 * Home icon
 *
 * @param {string} width
 * @param {string} color
 */
export const ZoomoutIcon = ({ width, color }) => {
  const DEFAULT_WIDTH = '18'
  const DEFAULT_COLOR = theme.colors.white

  return (
    <svg
      width={width || DEFAULT_WIDTH}
      fill={theme.colors[color] || DEFAULT_COLOR}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 297.613 297.613'
    >
      <path d="M213.574,75.039h-64.768c-4.971,0-9,4.029-9,9s4.029,9,9,9h55.768v55.768c0,4.971,4.029,9,9,9s9-4.029,9-9V84.039
		C222.574,79.068,218.545,75.039,213.574,75.039z"/>
      <path d="M148.807,204.574H93.039v-55.768c0-4.971-4.029-9-9-9s-9,4.029-9,9v64.768c0,4.971,4.029,9,9,9h64.768c4.971,0,9-4.029,9-9
		S153.777,204.574,148.807,204.574z"/>
      <path d="M148.807,0C66.754,0,0,66.754,0,148.807s66.754,148.807,148.807,148.807s148.807-66.754,148.807-148.807
		S230.859,0,148.807,0z M148.807,279.613C76.68,279.613,18,220.934,18,148.807S76.68,18,148.807,18s130.807,58.68,130.807,130.807
		S220.934,279.613,148.807,279.613z"/>
    </svg>
  )
}
