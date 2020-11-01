import { gql } from '@apollo/client'
import { makeVar } from '@apollo/client/cache'

// ? Types
type ServiceStatus = 'unknown' | 'available' | 'unavailable'
interface IServices {
  [key: string]: ServiceStatus
}
type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected'

// ? Reactive vars
export const servicesStatus = makeVar<IServices>({
  api: 'unknown',
})
export const connectionStatus = makeVar<ConnectionStatus>('connecting')

// ? Queries
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
