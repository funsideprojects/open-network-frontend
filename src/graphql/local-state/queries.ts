import { gql } from '@apollo/client'

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
