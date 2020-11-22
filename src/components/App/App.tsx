import React, { Suspense } from 'react'
import { useQuery } from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Loading from 'components/Loading'
import { GET_AUTH_USER } from 'graphql/user'
import {
  // GET_SERVICES_STATUS,
  GET_GLOBAL_LOADING,
} from 'graphql/local-state'
import { useWindowSize } from 'hooks/useWindowSize'
import theme from 'theme'

import GlobalStyle from './GlobalStyle'
import ScrollToTop from './ScrollToTop'

const AppLayout = React.lazy(() => import(/* webpackChunkName: "AppLayout" */ './AppLayout'))
const AuthLayout = React.lazy(() => import(/* webpackChunkName: "AuthLayout" */ 'pages/Auth/AuthLayout'))

const App = () => {
  // ? Responsive
  const windowSize = useWindowSize()
  const mode = windowSize.width! >= parseInt(theme.screen.md, 10) ? 'desktop' : 'mobile'

  const { loading, data: authUserData, refetch } = useQuery(GET_AUTH_USER, { fetchPolicy: 'cache-and-network' })
  const { data: globalLoadingStatus } = useQuery(GET_GLOBAL_LOADING)
  // const { data: servicesStatusData } = useQuery(GET_SERVICES_STATUS)

  return mode === 'desktop' ? (
    <Router>
      <GlobalStyle />

      {loading ? (
        <Loading overlay />
      ) : (
        <>
          <Suspense fallback={<></>}>
            <ScrollToTop>
              <Switch>
                {authUserData?.getAuthUser ? (
                  <Route render={() => <AppLayout authUser={authUserData.getAuthUser} />} />
                ) : (
                  <Route render={() => <AuthLayout refetchAuthUser={refetch} />} />
                )}
              </Switch>
            </ScrollToTop>
          </Suspense>

          {globalLoadingStatus.globalLoading ? <Loading overlay /> : <></>}
        </>
      )}
    </Router>
  ) : (
    <div>Download Mobile app</div>
  )
}

export default App
