import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

import 'normalize.css'
import 'fonts.less'

import { apolloClient } from '_apollo-client'
import theme from 'theme'

import App from 'components/App'

import * as serviceWorker from './serviceWorker'

render(
  <ApolloProvider client={apolloClient}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </RecoilRoot>
  </ApolloProvider>,
  document.getElementById('app-mountpoint')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
