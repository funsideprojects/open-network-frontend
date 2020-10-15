import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

import './fonts.less'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-notifications-component/dist/theme.css'
import 'normalize.css'

import { createApolloClient } from 'utils/apollo-client'
import { StoreProvider } from 'store'
import theme from 'theme'

import App from './components/App'

import * as serviceWorker from './serviceWorker'

// Create a Apollo client
const apolloClient = createApolloClient()

render(
  <ApolloProvider client={apolloClient}>
    <ApolloHooksProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </StoreProvider>
      </ThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
