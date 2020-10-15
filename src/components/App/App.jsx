import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

import { GET_AUTH_USER } from 'graphql/user'

import { LoadingScreenWrapper } from 'components/Loading'
import { GlobalStyle } from './GlobalStyles'
import ScrollToTop from './ScrollToTop'
import AppLayout from './AppLayout'
import AuthLayout from 'pages/Auth/AuthLayout'

const App = () => {
  const { loading, data, refetch } = useQuery(GET_AUTH_USER, { errorPolicy: 'ignore' })

  if (loading)
    return (
      <LoadingScreenWrapper>
        <LoadingOutlined style={{ fontSize: 30 }} />
      </LoadingScreenWrapper>
    )

  return (
    <Router>
      <GlobalStyle />

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

export default App
