import React, { Suspense } from 'react'
import { useQuery, NetworkStatus } from '@apollo/client'
import { useSetRecoilState } from 'recoil'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Loading from 'components/Loading'
import { GET_AUTH_USER } from 'graphql/user'
import { useWindowSize } from 'hooks/useWindowSize'
import { authAtoms } from 'store'

import theme from 'theme'

import GlobalStyle from './GlobalStyle'
import ScrollToTop from './ScrollToTop'
import GlobalLoading from './GlobalLoading'

const AppLayout = React.lazy(() => import(/* webpackChunkName: "AppLayout" */ './AppLayout'))
const AuthLayout = React.lazy(() => import(/* webpackChunkName: "AuthLayout" */ 'pages/Auth/AuthLayout'))

const App = () => {
  const setAuthUser = useSetRecoilState(authAtoms.userState)
  const windowSize = useWindowSize()

  const { data: authUserData, networkStatus } = useQuery(GET_AUTH_USER.gql, {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
    notifyOnNetworkStatusChange: true,
  })

  React.useEffect(() => {
    if (networkStatus === NetworkStatus.ready) {
      setAuthUser({ user: authUserData.getAuthUser })
    }
  }, [setAuthUser, networkStatus, authUserData])

  const mode = windowSize.width >= parseInt(theme.screen.md, 10) ? 'desktop' : 'mobile'

  return mode === 'desktop' ? (
    <Router>
      <GlobalStyle />

      {networkStatus === NetworkStatus.loading ? (
        <Loading overlay />
      ) : (
        <>
          <Suspense fallback={<></>}>
            <ScrollToTop>
              <Switch>
                <Route render={() => (authUserData?.getAuthUser ? <AppLayout /> : <AuthLayout />)} />
              </Switch>
            </ScrollToTop>
          </Suspense>

          {networkStatus === NetworkStatus.refetch && <Loading overlay />}

          <GlobalLoading />
        </>
      )}
    </Router>
  ) : (
    <div>Download Mobile app</div>
  )
}

export default App
