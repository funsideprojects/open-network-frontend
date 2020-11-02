import React, { Suspense } from 'react'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { useHistory, RouteProps, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Main, Footer } from 'components/Layout'

import * as Routes from 'routes'

// import backgroundMobile from 'assets/images/background-mobile.png'
import backgroundDesktop from 'assets/images/background-desktop.png'

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  /* flex-direc */
  justify-content: center;
  position: relative;
  background: url(${backgroundDesktop}) no-repeat top / cover;
  background-position: center;
`

const Section = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    justify-content: center;
    align-items: center;
  }
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

const AuthLayout = ({ refetchAuthUser }) => {
  const history = useHistory()
  const transitions = useTransition(history.location, ({ pathname }) => pathname, {
    from: { opacity: 0, transform: 'translate3d(40px, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    // leave: { opacity: 0, transform: 'translate3d(-40px, 0, 0)' },
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
          <Suspense fallback={<></>}>
            {transitions.map(({ state, key, props, item }) => (
              <Switch key={key} location={state === 'update' ? history.location : item}>
                {routes.map(({ Component, ...rest }, index) => (
                  <Route
                    key={index}
                    {...rest}
                    render={(routeProps) => (
                      <animated.div style={props}>
                        <Component {...routeProps} refetchAuthUser={refetchAuthUser} />
                      </animated.div>
                    )}
                  />
                ))}

                <Redirect to={Routes.SIGN_IN} />
              </Switch>
            ))}
          </Suspense>

          <Footer>aa</Footer>
        </Section>
      </Main>
    </Background>
  )
}

AuthLayout.propTypes = {
  refetchAuthUser: PropTypes.func.isRequired,
}

export default AuthLayout
