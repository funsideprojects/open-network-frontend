import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

import 'normalize.css'
import 'fonts.less'
// import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-notifications-component/dist/theme.css'

import { createApolloClient } from '_apollo-client'
import { StoreProvider } from 'store'
import theme from 'theme'

import App from './components/App'

import * as serviceWorker from './serviceWorker'

const apolloClient = createApolloClient()

render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StoreProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('app-mountpoint')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
