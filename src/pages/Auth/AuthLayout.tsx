import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import { RouteProps, Switch, Route, Redirect } from 'react-router-dom'
// import { NodeDotJs, Graphql, Apollographql, ReactLogo, StyledComponents } from '@styled-icons/simple-icons'

// import { Button } from 'components/Form/index'
import { Loading } from 'components/Loading'

import * as Routes from 'routes'

// import backgroundMobile from 'assets/images/background-mobile.png'
import backgroundDesktop from 'assets/images/background-desktop.png'

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  background: url(${backgroundDesktop}) no-repeat center center / cover;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
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

const FallbackContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
`

const WelcomeSection = React.lazy(() => import('./WelcomeSection'))
// const ForgotPasswordForm = React.lazy(() => import('./ForgotPassword'))
// const ResetPasswordForm = React.lazy(() => import('./ResetPassword'))
const SignInForm = React.lazy(() => import('./SignInForm'))
const SignUpForm = React.lazy(() => import('./SignUpForm'))

const AuthLayout = ({ refetchAuthUser }: AuthLayoutProps) => {
  const routes: Array<RouteProps & { Component: any }> = [
    {
      path: Routes.HOME,
      exact: true,
      strict: true,
      Component: WelcomeSection,
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
      Component: SignInForm,
    },
    {
      path: Routes.SIGN_UP,
      exact: true,
      strict: true,
      Component: SignUpForm,
    },
  ]

  return (
    <Background>
      <React.Suspense
        fallback={
          <FallbackContainer>
            <Loading />
          </FallbackContainer>
        }
      >
        <Switch>
          {routes.map(({ Component, ...rest }, index) => (
            <Route key={index} {...rest}>
              {({ match }) => (
                <CSSTransition in={match !== null} classNames="page" timeout={300} unmountOnExit>
                  <Component refetchAuthUser={refetchAuthUser} />
                </CSSTransition>
              )}
            </Route>
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
