import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import { RouteProps, Switch, Route, Redirect } from 'react-router-dom'
import { NodeDotJs, Graphql, Apollographql, ReactLogo, StyledComponents } from '@styled-icons/simple-icons'

import { Button } from 'components/Form/index'
import { Loading } from 'components/Loading'

import * as Routes from 'routes'

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

  .page {
    width: 100%;
  }

  .page-enter {
    opacity: 0;
    transform: scale(1.1);
  }

  .page-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  .page-exit {
    opacity: 1;
    transform: scale(1);
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

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

const ButtonGroup = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 40px);
  grid-column-gap: 20px;
  justify-content: center;
  align-content: center;
`

const SCIconNodeJs = styled(NodeDotJs)``
const SCIconGraphql = styled(Graphql)``
const SCIconApollo = styled(Apollographql)``
const SCIconReact = styled(ReactLogo)``
const SCIconSC = styled(StyledComponents)``

const WelcomeSection = React.lazy(() => import('./WelcomeSection'))
// const ForgotPasswordForm = React.lazy(() => import('./ForgotPassword'))
// const ResetPasswordForm = React.lazy(() => import('./ResetPassword'))
const SignInForm = React.lazy(() => import('./SignInForm'))
const SignUpForm = React.lazy(() => import('./SignUpForm'))

// @refresh reset
const AuthSection = ({ refetchAuthUser }: AuthSectionProps) => {
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

  const libraries = [
    { icon: SCIconNodeJs },
    { icon: SCIconGraphql },
    { icon: SCIconApollo },
    { icon: SCIconReact },
    { icon: SCIconSC },
  ]

  return (
    <Section data-name="auth-section">
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

      <Footer>
        <ButtonGroup>
          {libraries.map((lib, index) => (
            <Button key={index} bordered buttonType="text" icon={lib.icon} />
          ))}
        </ButtonGroup>
      </Footer>
    </Section>
  )
}

const authSectionProps = {
  refetchAuthUser: PropTypes.func.isRequired,
}

// ? For run-time
AuthSection.propTypes = authSectionProps
// ? For compile-time (static)
type AuthSectionProps = PropTypes.InferProps<typeof authSectionProps>

export default AuthSection
