import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

import SiteInfo from 'constants/SiteInfo.json'

/**
 * Component that manages changes to document head, currently for editing title only
 */
const Head = ({ title = SiteInfo.name }: HeadPropTypes) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
)

const headPropTypes = {
  title: PropTypes.string,
}

Head.propTypes = headPropTypes
type HeadPropTypes = PropTypes.InferProps<typeof headPropTypes>

export default Head
