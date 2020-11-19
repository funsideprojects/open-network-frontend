import { ApolloLink, from, Observable, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from '@apollo/client/link/ws'
import { InMemoryCache } from '@apollo/client/cache'
import { createUploadLink } from 'apollo-upload-client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient } from '@apollo/client/core'

import { globalLoading, servicesStatus, connectionStatus } from 'graphql/local-state'

// ? Create a Auth Link, that attach credentials to each request
const createAuthLink = () => {
  return new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle

        Promise.resolve(operation)
          .then((op) => {
            op.setContext({ fetchOptions: { credentials: 'include' } })
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) handle.unsubscribe()
        }
      })
  )
}

// ? Create a Error Link that handles error cases
const createErrorLink = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.debug('graphQLErrors', graphQLErrors)
    }

    if (networkError) {
      console.debug('networkError', networkError)
    }
  })
}

// ? GraphQL HTTP URL
const apiUrl = process.env.REACT_APP_API_URL

// ? GraphQL WebSocket (subscriptions) URL.
// ? If its url is not set in .env then it has same url, host and pathname
const WEBSOCKET_API_URL = process.env.REACT_APP_WEBSOCKET_API_URL
const websocketApiUrl = WEBSOCKET_API_URL
  ? WEBSOCKET_API_URL
  : apiUrl!.replace('https://', 'wss://').replace('http://', 'ws://')

// ? WebSocket link
const subscriptionClient = new SubscriptionClient(websocketApiUrl, {
  lazy: true,
  timeout: 60000,
  reconnect: true,
  connectionParams: () => {
    // todo: Get token to cookie
    const authToken = localStorage.getItem('token')

    return {
      authorization: authToken,
    }
  },
})
// subscriptionClient.onConnecting(() => {})
// subscriptionClient.onConnected(() => {})
// subscriptionClient.onDisconnected(() => {})
// subscriptionClient.onReconnecting(() => {})
// subscriptionClient.onReconnected(() => {})
// subscriptionClient.onError(() => {})

export const closeSubscription = () => {
  subscriptionClient.close()
}

// ? Caching
const cache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
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
  },
})

export const createApolloClient = () => {
  const authLink = createAuthLink()
  const errorLink = createErrorLink()
  const uploadLink = createUploadLink({ uri: apiUrl }) // ? Create upload link as well as an HTTP link
  const persistedQueriesLink = createPersistedQueryLink({ sha256 })

  const wsLink = new WebSocketLink(subscriptionClient)

  // ! Temporary fix for early websocket closure resulting in websocket connections not being instantiated
  // ! https://github.com/apollographql/subscriptions-transport-ws/issues/377
  wsLink['subscriptionClient'].maxConnectTimeGenerator.duration = () =>
    wsLink['subscriptionClient'].maxConnectTimeGenerator.max

  // ? Split links, so we can send data to each link depending on what kind of operation is being sent
  const terminatingLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)

      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    persistedQueriesLink.concat(uploadLink)
  )

  return new ApolloClient({
    link: from([errorLink, authLink, terminatingLink]),
    cache,
    connectToDevTools: process.env.NODE_ENV === 'development',
  })
}
