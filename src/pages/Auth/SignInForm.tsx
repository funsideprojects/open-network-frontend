import React from 'react'
import PropTypes from 'prop-types'
import { useApolloClient } from '@apollo/client'

import { EmailRegex } from 'constants/RegExr'
import { SIGN_IN } from 'graphql/user'

import { Input, Button } from 'components/Form/index'

import { Form, FormItem } from './Form.styled'

import { SCIUser, SCIUserCheck, SCIUserX, SCIKey, SCIRightArrowAlt } from './SignIn.styled'

enum SignInBy {
  USERNAME = 'Username',
  EMAIL = 'Email address',
}

const SignInForm = ({ refetchAuthUser }: SignInFormProps) => {
  const client = useApolloClient()

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
          autoFocus
          ref={emailOrUsernameRef}
          hasPrefix={validation.emailOrUsername ? SCIUserX : formData.emailOrUsername ? SCIUserCheck : SCIUser}
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
          hasPrefix={SCIKey}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleSetFormData}
        />
      </FormItem>

      <FormItem top="lg">
        <Button buttonType="primary" type="submit" block>
          SIGN IN <SCIRightArrowAlt />
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
