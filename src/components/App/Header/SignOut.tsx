import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/client'
import { LogOut } from '@styled-icons/ionicons-outline'

import { Button } from 'components/Form'
import { SIGN_OUT, GET_AUTH_USER } from 'graphql/user'

import { closeSubscription } from '_apollo-client'
import * as Routes from 'routes'

const SCILogOut = styled(LogOut)``

const SignOut = () => {
  const history = useHistory()
  const client = useApolloClient()
  const [signOut, { loading }] = useMutation(SIGN_OUT, {
    refetchQueries: [GET_AUTH_USER.name],
    awaitRefetchQueries: true,
  })

  const handleSignOut = () => {
    signOut().then(async () => {
      closeSubscription()
      await client.clearStore()
      history.push(Routes.SIGN_IN)
    })
  }

  return <Button buttonType="primary" loading={loading} icon={SCILogOut} onClick={handleSignOut} />
}

export default SignOut
