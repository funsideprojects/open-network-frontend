import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'

import backgroundDesktop from 'assets/images/background-desktop.png'
import { Loading } from 'components/Loading'
import { usePrefetch } from 'hooks/usePrefetch'

import * as Routes from 'routes'

import { routeMap } from './routeMap'

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  position: relative;
  background: url(${backgroundDesktop}) no-repeat top center / cover;
  background-attachment: fixed;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      -45deg,
      ${(p) => p.theme.colors.primary.main},
      ${(p) => p.theme.colors.primary.dark} 100%
    );
    opacity: 0.15;
  }
`

const AuthLayout = ({ refetchAuthUser }: AuthLayoutProps) => {
  usePrefetch(routeMap, 500)

  return (
    <Background>
      <React.Suspense fallback={<Loading overlay />}>
        <Switch>
          {routeMap.map(({ relatedRoutes, Component, ...restRouteProps }, index) => (
            <Route
              key={index}
              exact
              strict
              {...restRouteProps}
              render={() => <Component refetchAuthUser={refetchAuthUser} />}
            />
          ))}

          <Redirect to={Routes.SIGN_IN} />
        </Switch>
      </React.Suspense>
    </Background>
  )
}

const authLayoutProps = {
  refetchAuthUser: PropTypes.func.isRequired,
}

// ? For run-time
AuthLayout.propTypes = authLayoutProps
// ? For compile-time (static)
type AuthLayoutProps = PropTypes.InferProps<typeof authLayoutProps>

export default AuthLayout
