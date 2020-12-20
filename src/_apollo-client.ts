import { ApolloLink, from, Observable, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from '@apollo/client/link/ws'
import { InMemoryCache } from '@apollo/client/cache'
import { extractFiles } from 'extract-files'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { createUploadLink } from 'apollo-upload-client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient } from '@apollo/client/core'

import { typePolicies } from 'graphql/local-state'

// ? GraphQL api URL
const apiUrl = process.env.REACT_APP_API_URL

// ? GraphQL WebSocket (subscriptions) URL.
// ? If its url is not set in .env then it has same url, host and pathname
const WEBSOCKET_API_URL = process.env.REACT_APP_WEBSOCKET_API_URL
const websocketApiUrl = WEBSOCKET_API_URL
  ? WEBSOCKET_API_URL
  : apiUrl!.replace('https://', 'wss://').replace('http://', 'ws://')

// ? Auth-link attaches credentials to each request
const authLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handler

      Promise.resolve(operation)
        .then(({ setContext }) => {
          setContext({ fetchOptions: { credentials: 'include' } })
        })
        .then(() => {
          handler = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handler) handler.unsubscribe()
      }
    })
)

// ? Error-link handles error cases
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.debug('graphQLErrors', graphQLErrors)
  }

  if (networkError) {
    console.debug('networkError', networkError)
  }
})

// ? WebSocket-link
const subscriptionClient = new SubscriptionClient(websocketApiUrl, {
  lazy: true,
  // timeout: 10000,
  // minTimeout: 2000,
  reconnect: true,
  reconnectionAttempts: 50,
  connectionParams: () => {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('x-access-token'))
      ?.split('=')[1]

    if (accessToken) {
      return { 'x-access-token': accessToken }
    }
  },
})
// todo - Handle detect user connectivity
subscriptionClient.onConnecting(() => {
  console.debug('connecting')
})
subscriptionClient.onConnected(() => {
  console.debug('connected')
})
subscriptionClient.onDisconnected(() => {
  console.debug('disconnected')
})
subscriptionClient.onReconnecting(() => {
  console.debug('reconnecting')
})
subscriptionClient.onReconnected(() => {
  console.debug('connected')
})
subscriptionClient.onError((error) => {
  console.debug('error', error)
})

export const closeSubscription = () => {
  subscriptionClient.close()
}

const wsLink = new WebSocketLink(subscriptionClient)

// ! Temporary fix for early websocket closure resulting in websocket connections not being instantiated
// ! https://github.com/apollographql/subscriptions-transport-ws/issues/377
wsLink['subscriptionClient'].maxConnectTimeGenerator.duration = () =>
  wsLink['subscriptionClient'].maxConnectTimeGenerator.max

// ? Caching
const cache = new InMemoryCache({
  addTypename: false,
  typePolicies,
})

const batchHttpLink = new BatchHttpLink({ uri: apiUrl })

// ? Create Upload-link as well as an HTTP link
const uploadLink = createUploadLink({ uri: apiUrl })

// ? Persisted-Queries-link that hash query string for optimization purpose
const persistedQueriesLink = createPersistedQueryLink({ sha256 })

// ? Split links, so we can send data to each link depending on what kind of operation is being sent
const terminatingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  persistedQueriesLink.concat(
    split((operation) => extractFiles(operation).files.size > 0, uploadLink as any, batchHttpLink)
  )
)

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, terminatingLink]),
  cache,
  connectToDevTools: process.env.NODE_ENV === 'development',
  // credentials: 'include',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      // nextFetchPolicy(lastFetchPolicy) {
      //   if (lastFetchPolicy === 'cache-and-network') {
      //     return 'cache-first'
      //   }

      //   return lastFetchPolicy
      // },
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})
