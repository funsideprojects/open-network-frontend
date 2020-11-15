import React, { Suspense } from 'react'
import { useQuery } from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { GET_AUTH_USER } from 'graphql/user'
import {
  // GET_SERVICES_STATUS,
  GET_GLOBAL_LOADING,
} from 'graphql/local-state'

import { useWindowSize } from 'hooks/useWindowSize'

import { Loading } from 'components/Loading'
import GlobalStyle from './GlobalStyle'
import ScrollToTop from './ScrollToTop'

import theme from 'theme'

// const AppLayout = React.lazy(() => import('./AppLayout')) <AppLayout authUser={data.getAuthUser} />
const AuthLayout = React.lazy(() => import('pages/Auth/AuthLayout'))

const App = () => {
  // ? Responsive
  const windowSize = useWindowSize()
  const mode = windowSize.width! >= parseInt(theme.screen.md, 10) ? 'desktop' : 'mobile'

  const { loading, data: authUserData, refetch } = useQuery(GET_AUTH_USER, { fetchPolicy: 'cache-and-network' })
  const { data: globalLoadingStatus } = useQuery(GET_GLOBAL_LOADING)
  // const { data: servicesStatusData } = useQuery(GET_SERVICES_STATUS)

  return (
    <Router>
      <GlobalStyle />

      {globalLoadingStatus.globalLoading || loading || !mode ? <Loading overlay /> : <></>}

      <Suspense fallback={<></>}>
        <ScrollToTop>
          <Switch>
            {authUserData?.getAuthUser ? (
              <Route exact render={() => <></>} />
            ) : (
              <Route exact render={() => <AuthLayout refetchAuthUser={refetch} />} />
            )}
          </Switch>
        </ScrollToTop>
      </Suspense>
    </Router>
  )
}

export default App
