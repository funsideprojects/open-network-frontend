import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable, split } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws'

/** Creates a Apollo Link, that attach authentication token to each request */
const createAuthLink = () => {
  const request = (operation) => {
    // todo: Get token to cookie
    const token = localStorage.getItem('token')

    operation.setContext({
      headers: {
        authorization: token,
      },
    })
  }

  return new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle
        Promise.resolve(operation)
          .then((oper) => request(oper))
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

/** Helper functions that handles error cases */
const handleErrors = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors && process.env.NODE_ENV === 'development') {
      console.log('graphQLErrors', graphQLErrors)
    }
    if (networkError) {
      console.log('networkError', networkError)
    }
  })
}

// GraphQL HTTP URL
const API_URL = process.env.REACT_APP_API_URL

// GraphQL WebSocket (subscriptions) URL.
// If its url is not set in .env then it has same url, host and pathname
const WEBSOCKET_API_URL = process.env.REACT_APP_WEBSOCKET_API_URL
const websocketApiUrl = WEBSOCKET_API_URL
  ? WEBSOCKET_API_URL
  : API_URL!.replace('https://', 'wss://').replace('http://', 'ws://')

// ? WebSocket link
const wsLink = new WebSocketLink({
  uri: websocketApiUrl,
  options: {
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
  },
})

export const closeSubscription = () => {
  wsLink['subscriptionClient'].close()
}

export const createApolloClient = () => {
  const cache = new InMemoryCache({ addTypename: false })

  const errorLink = handleErrors()
  const authLink = createAuthLink()
  const uploadLink = createUploadLink({ uri: API_URL }) // ? Create upload link also create an HTTP link

  // ! Temporary fix for early websocket closure resulting in websocket connections not being instantiated
  // ! https://github.com/apollographql/subscriptions-transport-ws/issues/377
  wsLink['subscriptionClient'].maxConnectTimeGenerator.duration = () =>
    wsLink['subscriptionClient'].maxConnectTimeGenerator.max

  // Split links, so we can send data to each link depending on what kind of operation is being sent
  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation }: any = getMainDefinition(query)

      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    uploadLink as any
  )

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, terminatingLink]),
    cache,
  })
}
