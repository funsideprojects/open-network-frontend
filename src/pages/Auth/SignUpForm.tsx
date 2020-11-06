import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { Check, X } from '@styled-icons/boxicons-regular'

import { SIGN_UP } from 'graphql/user'

import { Input, Button } from 'components/Form/index'

import { Form, FormItem } from './Form.styled'

import * as Routes from 'routes'

const SCIconCheck = styled(Check)``
const SCIconX = styled(X)``

const SignUpForm = ({ refetchAuthUser }: SignUpFormProps) => {
  const history = useHistory()
  const client = useApolloClient()
  const [formData, setFormData] = React.useState({ fullName: '', email: '', username: '', password: '', confirm: '' })
  const [validation, setValidation] = React.useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirm: '',
  })

  const handleSetFormData = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    setValidation((prevState) => ({ ...prevState, [name]: '' }))
  }

  const handleSignUp = async () => {
    return await client
      .mutate({
        mutation: SIGN_UP,
        variables: {
          input: { ...formData },
        },
        fetchPolicy: 'no-cache',
      })
      .then(async ({ data }) => {
        await refetchAuthUser()
      })
      .catch((gqlError) => {})
  }

  const navigateToSignIn = () => {
    history.push(Routes.SIGN_IN)
  }

  const formControls = [
    {
      autoFocus: true,
      name: 'fullName',
      placeholder: 'Full name',
      hasError: !!validation.fullName,
      value: formData.fullName,
    },
    {
      name: 'email',
      placeholder: 'Email',
      hasError: !!validation.email,
      value: formData.email,
    },
    {
      name: 'username',
      placeholder: 'Username',
      hasError: !!validation.username,
      value: formData.username,
    },
    {
      name: 'password',
      autoComplete: 'on',
      type: 'password',
      placeholder: 'Password',
      hasError: !!validation.password,
      value: formData.password,
    },
    {
      name: 'confirm',
      autoComplete: 'on',
      type: 'password',
      placeholder: 'Confirm password',
      hasError: !!validation.confirm,
      value: formData.confirm,
    },
  ]

  return (
    <Form name="sign-up-form" onSubmit={handleSignUp}>
      {formControls.map((controlProps) => (
        <FormItem key={controlProps.name}>
          <Input
            {...controlProps}
            hasSuffix={controlProps.value ? (controlProps.hasError ? SCIconX : SCIconCheck) : undefined}
            onChange={handleSetFormData}
          />
        </FormItem>
      ))}

      <FormItem>
        <Button typeSubmit block>
          SIGN UP
        </Button>
      </FormItem>

      <FormItem>
        <Button block bordered buttonType="text" onClick={navigateToSignIn}>
          ALREADY HAVE AN ACCOUNT
        </Button>
      </FormItem>
    </Form>
  )
}

const signUpFormProps = {
  refetchAuthUser: PropTypes.func.isRequired,
}

SignUpForm.propTypes = signUpFormProps
type SignUpFormProps = PropTypes.InferProps<typeof signUpFormProps>

export default SignUpForm
