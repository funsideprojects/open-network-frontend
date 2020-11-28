import { makeVar } from '@apollo/client/cache'
import { TypePolicies } from '@apollo/client/cache'

// ? Types
type ServiceStatus = 'unknown' | 'available' | 'unavailable'
type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected'
type AuthUser = {
  id: string
  fullName: string
  email: string
  username: string
  image?: string
  imagePublicId?: string
  coverImage?: string
  coverImagePublicId?: string
  visibleToEveryone: boolean
  online: boolean
  displayOnlineStatus: boolean
  lastActiveAt: number
  createdAt: number
  updatedAt: number
}

// ? Vars
export const globalLoading = makeVar<boolean>(false)
export const servicesStatus = makeVar<{ [key: string]: ServiceStatus }>({ api: 'unknown' })
export const connectionStatus = makeVar<ConnectionStatus>('connecting')
export const authUser = makeVar<AuthUser | undefined>(undefined)

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
      authUser: {
        read() {
          return authUser()
        },
      },
    },
  },
}
