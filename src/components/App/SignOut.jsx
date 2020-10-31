import React from 'react'
import PropTypes from 'prop-types'
import { useApolloClient } from '@apollo/client'
import { withRouter } from 'react-router-dom'

import { Button } from 'components/Form'

import * as Routes from 'routes'

import { useStore } from 'store'
import { RESET_AUTH_STORE } from 'store/auth'

import { closeSubscription } from '_apollo-client'

/**
 * Component that signs out the user
 */
const SignOut = ({ history }) => {
  const client = useApolloClient()
  const [, dispatch] = useStore()

  const handleSignOut = () => {
    closeSubscription()
    localStorage.removeItem('token')

    client.resetStore()
    dispatch({ type: RESET_AUTH_STORE })
    history.push(Routes.HOME)
  }

  return (
    <Button text onClick={handleSignOut}>
      Sign out
    </Button>
  )
}

SignOut.propTypes = {
  history: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
}

export default withRouter(SignOut)
