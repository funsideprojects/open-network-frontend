import React from 'react'
// import PropTypes from 'prop-types'
import { useApolloClient } from '@apollo/client'

import { REQUEST_PASSWORD_RESET } from 'graphql/user'

import { Input, Button } from 'components/Form/index'

import { Form, FormItem } from './Form.styled'
import { SCICheck, SCIX } from './Generic.styled'

const SignUpForm = () => {
  const client = useApolloClient()
  const [formData, setFormData] = React.useState({ emailOrUsername: '' })
  const [validation, setValidation] = React.useState({ emailOrUsername: '' })

  const handleSetFormData = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    setValidation((prevState) => ({ ...prevState, [name]: '' }))
  }

  const handleSignUp = async () => {
    return await client
      .mutate({
        mutation: REQUEST_PASSWORD_RESET,
        variables: {
          input: { ...formData },
        },
        fetchPolicy: 'no-cache',
      })
      .then(async ({ data }) => {
        console.log('data', data)
      })
      .catch((gqlError) => {})
  }

  return (
    <Form name="sign-up-form" onSubmit={handleSignUp}>
      <FormItem top="xs">
        <Input
          name="emailOrUsername"
          hasSuffix={formData.emailOrUsername ? (validation.emailOrUsername ? SCIX : SCICheck) : undefined}
          placeholder="Username or Email address"
          hasError={validation.emailOrUsername}
          value={formData.emailOrUsername}
          onChange={handleSetFormData}
        />
      </FormItem>

      <FormItem top="lg">
        <Button buttonType="primary" block>
          Send
        </Button>
      </FormItem>
    </Form>
  )
}

// const signUpFormProps = {
//   refetchAuthUser: PropTypes.func.isRequired,
// }

// SignUpForm.propTypes = signUpFormProps
// type SignUpFormProps = PropTypes.InferProps<typeof signUpFormProps>

export default SignUpForm
