import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { useHistory, RouteProps, Switch, Route, Redirect } from 'react-router-dom'
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

// const ForgotPasswordForm = React.lazy(() => import('./ForgotPassword'))
// const ResetPasswordForm = React.lazy(() => import('./ResetPassword'))
const SignInForm = React.lazy(() => import('./SignInForm'))
const SignUpForm = React.lazy(() => import('./SignUpForm'))

// @refresh reset
const AuthSection = ({ refetchAuthUser }: AuthSectionProps) => {
  const history = useHistory()

  const transition = useTransition(history.location, {
    from: { opacity: 0, transform: 'translate3d(40px, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-40px, 0, 0)', position: 'absolute', zIndex: -5 },
  })
  const fragment = transition((style, item) => (

  ))

  const routes: Array<RouteProps & { Component: any }> = [
    // {
    //   path: Routes.SIGN_IN,
    //   exact: true,
    //   strict: true,
    //   Component: ForgotPasswordForm,
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
    {
      path: Routes.SIGN_UP,
      exact: true,
      strict: true,
      Component: SignUpForm,
    },
  ]

  // React.useEffect(()=>{
  //   return () => {
  //     transitions
  //   }
  // })

  return (
    <Section data-name="auth-section">
      <React.Suspense
        fallback={
          <FallbackContainer>
            <Loading />
          </FallbackContainer>
        }
      >
        {transition((style, item) => (
          <Switch key={item.key} location={history.location}>
            {routes.map(({ Component, ...rest }, index) => (
              <Route
                key={index}
                {...rest}
                render={(routeProps) => (
                  <animated.div style={{ ...style, width: '100%' }}>
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
        <ButtonGroup>
          <Button bordered icon={SCIconNodeJs} buttonType="text" />
          <Button bordered icon={SCIconGraphql} buttonType="text" />
          <Button bordered icon={SCIconApollo} buttonType="text" />
          <Button bordered icon={SCIconReact} buttonType="text" />
          <Button bordered icon={SCIconSC} buttonType="text" />
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
