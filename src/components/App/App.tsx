import React, { Suspense } from 'react'
import { useQuery } from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Loading from 'components/Loading'
import { GET_AUTH_USER } from 'graphql/user'
import { authUser } from 'graphql/local-state'
import { useWindowSize } from 'hooks/useWindowSize'
import theme from 'theme'

import GlobalStyle from './GlobalStyle'
import ScrollToTop from './ScrollToTop'
import GlobalLoading from './GlobalLoading'

const AppLayout = React.lazy(() => import(/* webpackChunkName: "AppLayout" */ './AppLayout'))
const AuthLayout = React.lazy(() => import(/* webpackChunkName: "AuthLayout" */ 'pages/Auth/AuthLayout'))

const App = () => {
  // ? Responsive
  const windowSize = useWindowSize()
  const mode = windowSize.width! >= parseInt(theme.screen.md, 10) ? 'desktop' : 'mobile'

  const { loading, data: authUserData, refetch } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  })

  React.useEffect(() => {
    // ? Save result to graphQL local state
    authUser(authUserData?.getAuthUser)
  }, [authUserData])

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
                  <Route render={() => <AppLayout refetchAuthUser={refetch} />} />
                ) : (
                  <Route render={() => <AuthLayout refetchAuthUser={refetch} />} />
                )}
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
