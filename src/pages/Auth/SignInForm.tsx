import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { User, UserCheck, UserX, Key } from '@styled-icons/feather'

import { EmailRegex } from 'constants/RegExr'
import { SIGN_IN } from 'graphql/user'
import { useStore } from 'store'

import { Input, Button } from 'components/Form/index'

import { Form, FormItem } from './Form.styled'

import * as Routes from 'routes'

const SCIconUser = styled(User)``
const SCIconUserCheck = styled(UserCheck)``
const SCIconUserX = styled(UserX)``
const SCIconKey = styled(Key)``

enum SignInBy {
  USERNAME = 'Username',
  EMAIL = 'Email address',
}

const SignInForm = ({ refetchAuthUser }: SignInFormProps) => {
  const history = useHistory()
  const client = useApolloClient()
  const [{ app }] = useStore()

  const emailOrUsernameRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const [formData, setFormData] = React.useState({ emailOrUsername: '', password: '' })
  const [validation, setValidation] = React.useState({ emailOrUsername: '', password: '' })
  const [placeholder, setPlaceholder] = React.useState('Username or Email address')

  const handleSetFormData = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    setValidation((prevState) => ({ ...prevState, [name]: '' }))
  }

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    client
      .mutate({
        mutation: SIGN_IN,
        variables: {
          input: { ...formData },
        },
      })
      .then(async ({ data }) => {
        await refetchAuthUser()
      })
      .catch((gqlErrors) => {
        setValidation((prevState) => ({ ...prevState, emailOrUsername: gqlErrors.message }))
        emailOrUsernameRef.current?.focus()
      })
  }

  const navigateToSignUp = () => {
    history.push(Routes.SIGN_UP)
  }

  React.useEffect(() => {
    let newPlaceholder: string

    if (!formData.emailOrUsername) {
      newPlaceholder = 'Username or Email address'
    } else if (EmailRegex.test(formData.emailOrUsername)) {
      newPlaceholder = SignInBy.EMAIL
    } else {
      newPlaceholder = SignInBy.USERNAME
    }

    if (newPlaceholder !== placeholder) {
      setPlaceholder(newPlaceholder)
    }
  }, [formData.emailOrUsername, placeholder])

  return (
    <Form name="sign-in-form" onSubmit={handleSignIn}>
      <FormItem>
        <Input
          authControl
          autoFocus={app.responsiveMode === 'desktop'}
          ref={emailOrUsernameRef}
          hasPrefix={validation.emailOrUsername ? SCIconUserX : formData.emailOrUsername ? SCIconUserCheck : SCIconUser}
          name="emailOrUsername"
          placeholder={placeholder}
          hasError={!!validation.emailOrUsername}
          value={formData.emailOrUsername}
          onChange={handleSetFormData}
        />
      </FormItem>

      <FormItem>
        <Input
          authControl
          autoComplete="on"
          type="password"
          ref={passwordRef}
          hasPrefix={SCIconKey}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleSetFormData}
        />
      </FormItem>

      <FormItem>
        <Button buttonType="submit" type="submit" block>
          SIGN IN
        </Button>
      </FormItem>

      <FormItem>
        <Button block bordered buttonType="text" onClick={navigateToSignUp}>
          CREATE NEW ACCOUNT
        </Button>
      </FormItem>
    </Form>
  )
}

const signInFormProps = {
  refetchAuthUser: PropTypes.func.isRequired,
}

SignInForm.propTypes = signInFormProps
type SignInFormProps = PropTypes.InferProps<typeof signInFormProps>

export default SignInForm
