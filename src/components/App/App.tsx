import React, { useEffect, Suspense } from 'react'
import { useQuery } from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { GET_SERVICES_STATUS } from 'graphql/local-state'
import { GET_AUTH_USER } from 'graphql/user'

import { useWindowSize } from 'hooks/useWindowSize'

import { Loading } from 'components/Loading'
import GlobalStyle from './GlobalStyle'
import ScrollToTop from './ScrollToTop'

import { useStore } from 'store'
import theme from 'theme'

// const AppLayout = React.lazy(() => import('./AppLayout')) <AppLayout authUser={data.getAuthUser} />
const AuthLayout = React.lazy(() => import('pages/Auth/AuthLayout'))

const App = () => {
  const [{ app }, dispatch] = useStore()

  // ? Responsive
  const windowSize = useWindowSize()
  const mode = windowSize.width! >= parseInt(theme.screen.md, 10) ? 'desktop' : 'mobile'

  const { loading, data, refetch } = useQuery(GET_AUTH_USER, { fetchPolicy: 'cache-and-network' })
  // todo get service status here
  const {
    data: { servicesStatus },
  } = useQuery(GET_SERVICES_STATUS)

  console.debug('App -> servicesStatus', servicesStatus)

  useEffect(() => {
    dispatch({ type: 'SET_RESPONSIVE_MODE', payload: mode })
  }, [dispatch, mode])

  return (
    <Router>
      <GlobalStyle />

      {loading || !app.responsiveMode ? <Loading overlay /> : <></>}

      {app.responsiveMode ? (
        <Suspense fallback={<></>}>
          <ScrollToTop>
            <Switch>
              {data?.getAuthUser ? (
                <Route exact render={() => <></>} />
              ) : (
                <Route exact render={() => <AuthLayout refetchAuthUser={refetch} />} />
              )}
            </Switch>
          </ScrollToTop>
        </Suspense>
      ) : (
        <></>
      )}
    </Router>
  )
}

export default App
