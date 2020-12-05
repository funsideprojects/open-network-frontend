import React, { Suspense } from 'react'
import { useQuery } from '@apollo/client'
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
  // ? Responsive
  const windowSize = useWindowSize()
  const mode = windowSize.width >= parseInt(theme.screen.md, 10) ? 'desktop' : 'mobile'

  const { loading, data: authUserData } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  })

  const setAuthUser = useSetRecoilState(authAtoms.userState)

  React.useEffect(() => {
    setAuthUser({ user: authUserData?.getAuthUser })
  }, [setAuthUser, authUserData])

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
                <Route render={() => (authUserData?.getAuthUser ? <AppLayout /> : <AuthLayout />)} />
              </Switch>
            </ScrollToTop>
          </Suspense>

          <GlobalLoading />
        </>
      )}
    </Router>
  ) : (
    <div>Download Mobile app</div>
  )
}

export default App
