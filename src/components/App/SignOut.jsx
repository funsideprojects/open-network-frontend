import React from 'react'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { Button } from 'components/Form'

import * as Routes from 'routes'

import { useStore } from 'store'
import { CLEAR_AUTH_USER } from 'store/auth'

import { closeSubscription } from 'utils/apollo-client'

/**
 * Component that signs out the user
 */
const SignOut = ({ client, history }) => {
  const [, dispatch] = useStore()

  const handleSignOut = () => {
    closeSubscription()
    localStorage.removeItem('token')

    client.resetStore()
    dispatch({ type: CLEAR_AUTH_USER })
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

export default withRouter(withApollo(SignOut))
