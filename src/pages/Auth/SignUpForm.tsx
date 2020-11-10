import React from 'react'
import PropTypes from 'prop-types'
import { useApolloClient } from '@apollo/client'

import { SIGN_UP } from 'graphql/user'

import { Input, Button } from 'components/Form/index'

import { Form, FormItem } from './Form.styled'
import { SCICheck, SCIX } from './SignUp.styled'
import { SCIRightArrowAlt } from './Generic.styled'

const SignUpForm = ({ refetchAuthUser }: SignUpFormProps) => {
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

  const formItems = [
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
      {formItems.map((itemProps) => (
        <FormItem key={itemProps.name}>
          <Input
            {...itemProps}
            hasSuffix={itemProps.value ? (itemProps.hasError ? SCIX : SCICheck) : undefined}
            onChange={handleSetFormData}
          />
        </FormItem>
      ))}

      <FormItem>
        <Button buttonType="primary" block>
          SIGN UP <SCIRightArrowAlt />
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
