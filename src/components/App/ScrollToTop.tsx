import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

/**
 * Scroll to top on route change
 */
const ScrollToTop = ({ children }: Props) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children
}

const componentPropTypes = {
  children: PropTypes.any,
}

ScrollToTop.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default ScrollToTop
