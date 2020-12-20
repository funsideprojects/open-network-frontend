import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { SIGN_IN, GET_AUTH_USER } from 'graphql/user'
import { Form, FormItem, Input, Button } from 'components/Form'
import Tag, { TagColor } from 'components/Tag'

import * as Routes from 'routes'

import { SCIArrowForward, Hint, PrimaryText } from './Generic.styled'
import { SCIUser, SCIUserCheck, SCIUserX, SCIKey } from './SignIn.styled'

interface FormFields {
  emailOrUsername: string
  password: string
}

const SignInForm = ({ navigate }: Props) => {
  const [signIn, { loading }] = useMutation(SIGN_IN, {
    refetchQueries: [GET_AUTH_USER.name],
  })
  const { register, handleSubmit, getValues, errors, formState } = useForm<FormFields>({
    mode: 'onTouched',
    shouldFocusError: true,
  })
  const [response, setResponse] = React.useState<{ type?: TagColor; message?: string }>({
    type: undefined,
    message: undefined,
  })

  const handleSignIn = (values: FormFields) => {
    return signIn({ variables: { input: { ...values } } }).catch((gqlError) => {
      setResponse({ type: TagColor.Error, message: gqlError.message })
    })
  }

  return (
    <Form
      name="sign-in-form"
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(handleSignIn)(event)
      }}
    >
      <FormItem>
        <Input
          animatedLabel
          autoFocus
          name="emailOrUsername"
          placeholder="Username or Email address"
          ref={register({ required: 'Please enter your email or username' })}
          hasPrefix={
            errors.emailOrUsername?.message ? SCIUserX : formState.touched.emailOrUsername ? SCIUserCheck : SCIUser
          }
          hasError={errors.emailOrUsername?.message}
        />
      </FormItem>

      <FormItem>
        <Input
          animatedLabel
          autoComplete="on"
          type="password"
          name="password"
          placeholder="Password"
          ref={register({ required: 'Please enter your password' })}
          hasPrefix={SCIKey}
          hasError={errors.password?.message}
        />
      </FormItem>

      <FormItem top="none">
        <Hint align="left">
          <PrimaryText
            onClick={() => {
              const emailOrUsernameValue = getValues('emailOrUsername')

              navigate(`${Routes.FORGOT_PASSWORD}${emailOrUsernameValue ? `/${emailOrUsernameValue}` : ''}`)
            }}
          >
            Forgot password?
          </PrimaryText>
        </Hint>
      </FormItem>

      <FormItem top="sm">
        <Tag block visible={!!response.message} tagColor={response.type}>
          {response.message}
        </Tag>
      </FormItem>

      <FormItem top="none">
        <Button block buttonType="primary" type="submit" loading={loading} icon={SCIArrowForward} />
      </FormItem>
    </Form>
  )
}

const componentPropTypes = {
  navigate: PropTypes.func.isRequired,
}

SignInForm.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default SignInForm
