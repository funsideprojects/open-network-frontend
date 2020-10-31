import React from 'react'
import { hot } from 'react-hot-loader/root'
import { useQuery } from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { GET_AUTH_USER } from 'graphql/user'

import { Loading } from 'components/Loading'
import { GlobalStyle } from './GlobalStyles'
import ScrollToTop from './ScrollToTop'
import AppLayout from './AppLayout'
import AuthLayout from 'pages/Auth/AuthLayout'

import { serverAvailable } from '_apollo-client'

const App = () => {
  const { loading, data, refetch } = useQuery(GET_AUTH_USER)

  const x = serverAvailable()

  console.log('serverAvailable', x)
  console.log('object')

  return (
    <Router>
      <GlobalStyle />

      {loading ? <Loading overlay /> : <></>}

      <ScrollToTop>
        <Switch>
          {data?.getAuthUser ? (
            <Route exact render={() => <AppLayout authUser={data.getAuthUser} />} />
          ) : (
            <Route exact render={() => <AuthLayout refetch={refetch} />} />
          )}
        </Switch>
      </ScrollToTop>
    </Router>
  )
}

export default hot(App)
