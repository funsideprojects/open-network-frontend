import { makeVar } from '@apollo/client/cache'
import { TypePolicies } from '@apollo/client/cache'

// ? Types
type ServiceStatus = 'unknown' | 'available' | 'unavailable'
type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected'

// ? Vars
export const globalLoading = makeVar<boolean>(false)
export const servicesStatus = makeVar<{ [key: string]: ServiceStatus }>({ api: 'unknown' })
export const connectionStatus = makeVar<ConnectionStatus>('connecting')

// ? TypePolicies
export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      globalLoading: {
        read() {
          return globalLoading()
        },
      },
      servicesStatus: {
        read() {
          return servicesStatus()
        },
      },
      connectionStatus: {
        read() {
          return connectionStatus()
        },
      },
    },
  },
}
