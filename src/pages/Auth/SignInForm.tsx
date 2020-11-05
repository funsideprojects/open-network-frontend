import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { User, UserCheck, UserX, Key } from '@styled-icons/feather'

import { EmailRegex } from 'constants/RegExr'
import { SIGN_IN } from 'graphql/user'

import { Input, Button } from 'components/Form/index'

import * as Routes from 'routes'

const StyledIconUser = styled(User)``
const StyledIconUserCheck = styled(UserCheck)``
const StyledIconUserX = styled(UserX)``
const StyledIconKey = styled(Key)``
const Form = styled.form`
  margin-bottom: ${(props) => props.theme.spacing.md};
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
  const history = useHistory()
  const client = useApolloClient()
  const usernameRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const [formData, setFormData] = React.useState({ username: '', password: '' })
  const [hasError, setHasError] = React.useState('')
  const [placeholder, setPlaceholder] = React.useState('')

  const handleSetFormData = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
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
        console.log('handleSignIn -> data', data)
        // await refetchAuthUser()
        // history.push(Routes.HOME)
      })
      .catch((gqlErrors) => {
        setHasError(gqlErrors[0].message)
      })
  }

  React.useEffect(() => {
    if (!formData.username) {
      setPlaceholder('Username or Email address')
    } else if (EmailRegex.test(formData.username)) {
      setPlaceholder(SignInBy.EMAIL)
    } else {
      setPlaceholder(SignInBy.USERNAME)
    }
  }, [formData.username])

  return (
    <Form name="sign-in-form" onSubmit={handleSignIn}>
      <FormItem>
        <Input
          authControl
          ref={usernameRef}
          hasPrefix={hasError ? StyledIconUserX : formData.username ? StyledIconUserCheck : StyledIconUser}
          name="username"
          placeholder={placeholder}
          value={formData.username}
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
