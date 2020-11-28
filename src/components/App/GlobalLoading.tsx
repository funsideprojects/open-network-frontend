import React from 'react'
import { useQuery } from '@apollo/client'

import Loading from 'components/Loading'
import { GET_GLOBAL_LOADING } from 'graphql/local-state'

const GlobalLoading = () => {
  const { data: globalLoadingStatus } = useQuery(GET_GLOBAL_LOADING)

  return globalLoadingStatus.globalLoading ? <Loading overlay /> : <React.Fragment />
}

export default GlobalLoading
