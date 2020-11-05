import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { useHistory, RouteProps, Switch, Route, Redirect } from 'react-router-dom'

import { Main, Footer } from 'components/Layout'

import * as Routes from 'routes'

// import backgroundMobile from 'assets/images/background-mobile.png'
import backgroundDesktop from 'assets/images/background-desktop.png'

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Section = styled.section`
  width: calc(100% - 40px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${(p) => p.theme.radius.md};
  margin: 20px 20px 0;
  padding: 20px;
  background: ${(p) => p.theme.colors.white};
`

// const FormContainer = styled.div`
//   width: calc(100% - 480px);
//   height: 100%;
//   background-image: linear-gradient(135deg, rgba(70, 134, 161, 0.7), rgba(92, 42, 139, 0.7));
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

// const ForgotPasswordForm = React.lazy(() => import('./ForgotPassword'))
// const ResetPasswordForm = React.lazy(() => import('./ResetPassword'))
const SignInForm = React.lazy(() => import('./SignInForm'))
// const SignUpForm = React.lazy(() => import('./SignUpForm'))

// @refresh reset
const AuthLayout = ({ refetchAuthUser }: AuthLayoutProps) => {
  const history = useHistory()
  const transitions = useTransition(history.location, ({ pathname }) => pathname, {
    from: { opacity: 0, transform: 'translate3d(40px, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-40px, 0, 0)' },
  })

  const routes: Array<RouteProps & { Component: any }> = [
    // {
    //   path: Routes.SIGN_IN,
    //   exact: true,
    //   strict: true,
    //   Component: SignInForm,
    // },
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
    // {
    //   path: Routes.SIGN_IN,
    //   exact: true,
    //   strict: true,
    //   Component: SignInForm,
    // },
  ]

  return (
    <Background>
      <Main>
        <Section>
          <React.Suspense fallback={<></>}>
            {transitions.map(({ key, props }) => (
              <Switch key={key} location={history.location}>
                {routes.map(({ Component, ...rest }, index) => (
                  <Route
                    key={index}
                    {...rest}
                    render={(routeProps) => (
                      <animated.div style={{ ...props, width: '100%' }}>
                        <Component {...routeProps} refetchAuthUser={refetchAuthUser} />
                      </animated.div>
                    )}
                  />
                ))}

                <Redirect to={Routes.SIGN_IN} />
              </Switch>
            ))}
          </React.Suspense>

          <Footer>
            <h3>
              <b>Or sign in with social account</b>
            </h3>
          </Footer>
        </Section>
      </Main>
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
