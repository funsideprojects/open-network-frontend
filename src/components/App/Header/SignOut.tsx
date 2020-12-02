import React from 'react'
import styled from 'styled-components'
import { useMutation, useApolloClient } from '@apollo/client'
import { LogOut } from '@styled-icons/ionicons-outline'

import { Button } from 'components/Form'
import { SIGN_OUT } from 'graphql/user'

import { closeSubscription } from '_apollo-client'

const SCILogOut = styled(LogOut)``

const SignOut = () => {
  const client = useApolloClient()
  const [signOut, { loading }] = useMutation(SIGN_OUT, { refetchQueries: ['getAuthUser'], awaitRefetchQueries: true })

  return (
    <Button
      buttonType="primary"
      loading={loading}
      icon={SCILogOut}
      onClick={() => {
        signOut().then(() => {
          closeSubscription()
          client.resetStore()
        })
      }}
    />
  )
}

export default SignOut
