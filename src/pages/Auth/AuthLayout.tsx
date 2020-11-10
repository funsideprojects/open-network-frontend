import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RouteProps, Switch, Route, Redirect } from 'react-router-dom'
// import { NodeDotJs, Graphql, Apollographql, ReactLogo, StyledComponents } from '@styled-icons/simple-icons'

import { Loading } from 'components/Loading'

import * as Routes from 'routes'

// import backgroundMobile from 'assets/images/background-mobile.png'
import backgroundDesktop from 'assets/images/background-desktop.png'

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  position: relative;
  background: url(${backgroundDesktop}) no-repeat center center / cover;

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

const WelcomeDrawer = React.lazy(() => import('./WelcomeDrawer'))
// const ForgotPasswordForm = React.lazy(() => import('./ForgotPassword'))
// const ResetPasswordForm = React.lazy(() => import('./ResetPassword'))
const SignInDrawer = React.lazy(() => import('./SignInDrawer'))
const SignUpDrawer = React.lazy(() => import('./SignUpDrawer'))

// @refresh reset
const AuthLayout = ({ refetchAuthUser }: AuthLayoutProps) => {
  const routes: Array<RouteProps & { Component: any }> = [
    {
      path: Routes.HOME,
      exact: true,
      strict: true,
      Component: WelcomeDrawer,
    },
    // {
    //   path: Routes.SIGN_IN,
    //   exact: true,
    //   strict: true,
    //   Component: SignInForm,
    // },
    {
      path: Routes.SIGN_IN,
      exact: true,
      strict: true,
      Component: SignInDrawer,
    },
    {
      path: Routes.SIGN_UP,
      exact: true,
      strict: true,
      Component: SignUpDrawer,
    },
  ]

  return (
    <Background>
      <React.Suspense fallback={<Loading overlay />}>
        <Switch>
          {routes.map(({ Component, ...rest }, index) => (
            <Route
              key={index}
              {...rest}
              render={(routeProps) => <Component {...routeProps} refetchAuthUser={refetchAuthUser} />}
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
