import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Main } from 'components/Layout'

// import backgroundMobile from 'assets/images/background-mobile.png'
import backgroundDesktop from 'assets/images/background-desktop.png'

import AuthSection from './AuthSection'

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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

const AuthLayout = ({ refetchAuthUser }: AuthLayoutProps) => {
  return (
    <Background>
      <Main>
        <AuthSection refetchAuthUser={refetchAuthUser} />
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
