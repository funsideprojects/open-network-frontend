import React from 'react'
import { useParams } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { emailRegex, responsePrefixRegex } from 'constants/RegExr'
import { REQUEST_PASSWORD_RESET } from 'graphql/user'
import { Form, FormItem, Input, Button, ButtonRefAttributes } from 'components/Form'
import Tag, { TagColor } from 'components/Tag'

import * as Routes from 'routes'

import { SCICheck, SCIX, SCIRightArrowAlt } from './Generic.styled'

type RouteParams = { emailOrUsername?: string }
interface FormFields {
  emailOrUsername: string
}

const RequestPasswordResetForm = () => {
  const { emailOrUsername = '' } = useParams<RouteParams>()
  const client = useApolloClient()
  const { register, handleSubmit, setError, errors, formState } = useForm<FormFields>({
    mode: 'onTouched',
    defaultValues: { emailOrUsername },
    shouldFocusError: true,
  })
  const [response, setResponse] = React.useState<{ type?: TagColor; message?: string }>({
    type: undefined,
    message: undefined,
  })
  const buttonRef = React.useRef<ButtonRefAttributes>(null)

  const resetResponse = () => {
    if (response.message) {
      setResponse({ type: undefined, message: undefined })
    }
  }

  const handleRequestPasswordReset = async (values: FormFields) => {
    resetResponse()
    buttonRef.current?.setLoading(true)
    const isEmail = emailRegex.test(values.emailOrUsername)

    return await client
      .mutate({
        mutation: REQUEST_PASSWORD_RESET,
        variables: {
          input: { [isEmail ? 'email' : 'username']: values.emailOrUsername },
        },
        fetchPolicy: 'no-cache',
      })
      .then(() => {
        setResponse({
          type: TagColor.Success,
          message: 'An instruction email has been sent. Please check your mailbox',
        })
      })
      .catch((gqlError) => {
        if (gqlError.message.startsWith('__INPUT__')) {
          setError('emailOrUsername', { message: gqlError.message.replace(responsePrefixRegex, '') })
        } else {
          setResponse({ type: TagColor.Error, message: gqlError.message })
        }
      })
      .finally(() => buttonRef.current?.setLoading(false))
  }

  console.log('render')

  return (
    <Form name="request-password-reset-form" onSubmit={handleSubmit(handleRequestPasswordReset)}>
      <FormItem top="xs">
        <Input
          autoFocus
          name="emailOrUsername"
          placeholder="Username or Email address"
          ref={register({ required: 'Please enter your email or username' })}
          hasSuffix={errors.emailOrUsername ? SCIX : formState.touched.emailOrUsername ? SCICheck : undefined}
          hasError={errors.emailOrUsername?.message}
          onChange={({ target: { value } }) => {
            resetResponse()
            window.history.replaceState(null, '', `${Routes.FORGOT_PASSWORD}${value ? `/${value}` : ''}`)
          }}
        />
      </FormItem>

      <FormItem top="sm">
        <Tag block visible={!!response.message} tagColor={response.type}>
          {response.message}
        </Tag>
      </FormItem>

      <FormItem top="xs">
        <Button block ref={buttonRef} type="submit" buttonType="primary" icon={SCIRightArrowAlt} />
      </FormItem>
    </Form>
  )
}

export default React.memo(RequestPasswordResetForm)
