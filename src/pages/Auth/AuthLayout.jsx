import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import ResetPassword from './ResetPassword'
import ForgotPassword from './ForgotPassword'

import * as Routes from 'routes'

import background from 'assets/images/background/background-min.jpg'

const Root = styled.div`
  background: url(${background}) no-repeat top / cover;
  width: 100%;
  height: 100vh;
  background-position: center;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: ${(p) => p.theme.zIndex.lg};
  display: flex;
  justify-content: flex-start;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    justify-content: center;
  }
`

const RightContainer = styled.div`
  width: 480px;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${(p) => p.theme.screen.md}) {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
  }
`

const LeftContainer = styled.div`
  width: calc(100% - 480px);
  height: 100%;
  background-image: linear-gradient(135deg, rgba(70, 134, 161, 0.7), rgba(92, 42, 139, 0.7));
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${(p) => p.theme.screen.md}) {
    display: none;
  }
`

const Introduce = styled.div`
  width: 420px;

  p {
    color: #fff;
  }
`

const Heading = styled.h2`
  color: #fff;
  margin-bottom: 24px;
  font-weight: 700;
`

/**
 * Main Layout for the app, when user isn't authenticated
 */
const AuthLayout = ({ refetch }) => {
  return (
    <Root>
      <Container>
        <LeftContainer>
          <Introduce>
            <Heading color='white'>Connect with friends and the world around you.</Heading>
            <p>See photos and updates from your friends.</p>
            <p>Follow your interests.</p>
            <p>Hear what people are talking about.</p>
          </Introduce>
        </LeftContainer>
        <RightContainer>
          <Switch>
            <Route exact path={Routes.HOME} render={() => <SignInForm refetch={refetch} />} />
            <Route exact path={Routes.SIGN_UP} render={() => <SignUpForm refetch={refetch} />} />
            <Route exact path={Routes.FORGOT_PASSWORD} component={ForgotPassword} />
            <Route exact path={Routes.RESET_PASSWORD} render={() => <ResetPassword refetch={refetch} />} />
            <Redirect to={Routes.HOME} />
          </Switch>
        </RightContainer>
      </Container>
    </Root>
  )
}

AuthLayout.propTypes = {
  refetch: PropTypes.func.isRequired,
}

export default AuthLayout
