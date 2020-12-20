import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

import SiteInfo from 'constants/SiteInfo.json'

/**
 * Component that manages changes to document head
 */
const Component = ({ children, title = SiteInfo.name, suffix }: Props) => {
  const documentTitle = suffix ? `${SiteInfo.name} - ${suffix}` : title

  return (
    <Helmet>
      <title>{documentTitle}</title>
      {children}
    </Helmet>
  )
}

const componentPropTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  suffix: PropTypes.string,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Component
