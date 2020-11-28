import { gql } from '@apollo/client'

import { authUserPayload } from 'graphql/types'

// ? Queries
export const GET_GLOBAL_LOADING = gql`
  query {
    globalLoading @client
  }
`

export const GET_SERVICES_STATUS = gql`
  query {
    servicesStatus @client {
      api
    }
  }
`

export const GET_CONNECTION_STATUS = gql`
  query {
    connectionStatus @client
  }
`

export const LS_GET_AUTH_USER = gql`
  query {
    authUser @client {
      ${authUserPayload}
    }
  }
`
