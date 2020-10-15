import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

const AnimatedCount = ({ to }) => {
  const props = useSpring({ from: { val: 0 }, to: { val: to } })

  return <animated.span>{props.val.interpolate((val) => Math.floor(val))}</animated.span>
}

AnimatedCount.propTypes = {
  to: PropTypes.number.isRequired,
}

export default AnimatedCount
