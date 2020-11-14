import { gql } from '@apollo/client'
import { makeVar } from '@apollo/client/cache'

// ? Types
type ServiceStatus = 'unknown' | 'available' | 'unavailable'
type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected'

// ? Reactive vars
export const globalLoading = makeVar<boolean>(false)
export const servicesStatus = makeVar<{ [key: string]: ServiceStatus }>({ api: 'unknown' })
export const connectionStatus = makeVar<ConnectionStatus>('connecting')

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
