import React from 'react'
import PropTypes from 'prop-types'
import { useApolloClient } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { SIGN_IN } from 'graphql/user'
import { Form, FormItem, Input, Button, ButtonRefAttributes } from 'components/Form'
import Tag, { TagColor } from 'components/Tag'

import * as Routes from 'routes'

import { SCIRightArrowAlt, Hint, PrimaryText } from './Generic.styled'
import { SCIUser, SCIUserCheck, SCIUserX, SCIKey } from './SignIn.styled'

interface FormFields {
  emailOrUsername: string
  password: string
}

const SignInForm = ({ refetchAuthUser, navigate }: SignInFormProps) => {
  const client = useApolloClient()
  const { register, handleSubmit, getValues, errors, formState } = useForm<FormFields>({
    mode: 'onTouched',
    shouldFocusError: true,
  })
  const [response, setResponse] = React.useState<{ type?: TagColor; message?: string }>({
    type: undefined,
    message: undefined,
  })
  const buttonRef = React.useRef<ButtonRefAttributes>(null)

  const handleSignIn = async (values: FormFields) => {
    buttonRef.current?.setLoading(true)

    return await client
      .mutate({
        mutation: SIGN_IN,
        variables: {
          input: { ...values },
        },
      })
      .then(async () => {
        await refetchAuthUser()
      })
      .catch((gqlError) => {
        buttonRef.current?.setLoading(false)
        setResponse({ type: TagColor.Error, message: gqlError.message })
      })
  }

  return (
    <Form name="sign-in-form" onSubmit={handleSubmit(handleSignIn)}>
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
        <Button block ref={buttonRef} buttonType="primary" type="submit" icon={SCIRightArrowAlt} />
      </FormItem>
    </Form>
  )
}

const signInFormPropTypes = {
  refetchAuthUser: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
}

SignInForm.propTypes = signInFormPropTypes
type SignInFormProps = PropTypes.InferProps<typeof signInFormPropTypes>

export default React.memo(SignInForm)
