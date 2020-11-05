import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { User, UserCheck, UserX, Key } from '@styled-icons/feather'

import { EmailRegex } from 'constants/RegExr'
import { SIGN_IN } from 'graphql/user'

import { Input, Button } from 'components/Form/index'

const StyledIconUser = styled(User)``
const StyledIconUserCheck = styled(UserCheck)``
const StyledIconUserX = styled(UserX)``
const StyledIconKey = styled(Key)``
const Form = styled.form`
  margin-bottom: ${(props) => props.theme.spacing.sm};
`
const FormItem = styled.div`
  width: 100%;
  padding: 10px 0 0;
  margin-bottom: 10px;
`

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
          hasPrefix={
            validation.emailOrUsername
              ? StyledIconUserX
              : formData.emailOrUsername
              ? StyledIconUserCheck
              : StyledIconUser
          }
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
          type="password"
          ref={passwordRef}
          hasPrefix={StyledIconKey}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleSetFormData}
        />
      </FormItem>

      <FormItem>
        <Button typeSubmit>SIGN IN</Button>
      </FormItem>

      <FormItem>
        <Button block bordered buttonType="text">
          SIGN UP
        </Button>
      </FormItem>
    </Form>
  )
}

const signInFormProps = {
  history: PropTypes.object.isRequired,
  refetchAuthUser: PropTypes.func.isRequired,
}

SignInForm.propTypes = signInFormProps
type SignInFormProps = PropTypes.InferProps<typeof signInFormProps>

export default SignInForm
