import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { useHistory, RouteProps, Switch, Route, Redirect } from 'react-router-dom'
import { Google } from '@styled-icons/boxicons-logos'

import { Main } from 'components/Layout'
import { Button } from 'components/Form/index'

import * as Routes from 'routes'

// import backgroundMobile from 'assets/images/background-mobile.png'
import backgroundDesktop from 'assets/images/background-desktop.png'

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: url(${backgroundDesktop}) no-repeat center / cover;

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
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.3);
  border-radius: ${(p) => p.theme.radius.lg};
  margin: 20px 20px 0;
  padding: 20px;
  background: ${(p) => p.theme.colors.white};
`

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const H3 = styled.h3`
  font-weight: 600;
`

const ButtonGroup = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledIconGoogle = styled(Google)``

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
            <H3>Or sign in with social account</H3>

            <ButtonGroup>
              <Button bordered icon={StyledIconGoogle} buttonType="default" />
            </ButtonGroup>
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
