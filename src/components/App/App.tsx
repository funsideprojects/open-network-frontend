import React from 'react'
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

const AppLayout = React.lazy(() => import('./AppLayout'))
const AuthLayout = React.lazy(() => import('pages/Auth/AuthLayout'))

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
      setAuthUser({ user: authUserData?.getAuthUser })
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
          <React.Suspense fallback={<React.Fragment />}>
            <ScrollToTop>
              <Switch>
                <Route render={() => (authUserData?.getAuthUser ? <AppLayout /> : <AuthLayout />)} />
              </Switch>
            </ScrollToTop>
          </React.Suspense>

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
