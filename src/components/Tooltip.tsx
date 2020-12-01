import React from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({ children }: Props) => {
  const childRef = React.useRef(null)

  return children({ ref: childRef })
}

const componentPropTypes = {
  children: PropTypes.any,
}

Tooltip.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Tooltip
