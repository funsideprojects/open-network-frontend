import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Timer = ({ seconds, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return onFinish()

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, onFinish])

  return <>{timeLeft}</>
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  onFinish: PropTypes.func.isRequired,
}

export default Timer
