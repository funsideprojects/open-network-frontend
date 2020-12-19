import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { emailRegex, responsePrefixRegex } from 'constants/RegExr'
import { REQUEST_PASSWORD_RESET } from 'graphql/user'
import { Form, FormItem, Input, Button } from 'components/Form'
import Tag, { TagColor } from 'components/Tag'

import * as Routes from 'routes'

import { SCICheckmark, SCIClose, SCIArrowForward } from './Generic.styled'

type RouteParams = { emailOrUsername?: string }
interface FormFields {
  emailOrUsername: string
}

const RequestPasswordResetForm = () => {
  const { emailOrUsername = '' } = useParams<RouteParams>()
  const [requestPasswordReset, { loading }] = useMutation(REQUEST_PASSWORD_RESET)
  const { register, handleSubmit, setError, errors, formState } = useForm<FormFields>({
    mode: 'onTouched',
    defaultValues: { emailOrUsername },
    shouldFocusError: true,
  })
  const [response, setResponse] = React.useState<{ type?: TagColor; message?: string }>({
    type: undefined,
    message: undefined,
  })

  const resetResponse = () => {
    if (response.message) {
      setResponse({ type: undefined, message: undefined })
    }
  }

  const handleRequestPasswordReset = async (values: FormFields) => {
    resetResponse()
    const isEmail = emailRegex.test(values.emailOrUsername)

    return await requestPasswordReset({
      variables: { input: { [isEmail ? 'email' : 'username']: values.emailOrUsername } },
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
  }

  return (
    <Form
      name="request-password-reset-form"
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(handleRequestPasswordReset)(event)
      }}
    >
      <FormItem top="xs">
        <Input
          autoFocus
          name="emailOrUsername"
          placeholder="Username or Email address"
          ref={register({ required: 'Please enter your email or username' })}
          hasSuffix={errors.emailOrUsername ? SCIClose : formState.touched.emailOrUsername ? SCICheckmark : undefined}
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
        <Button block type="submit" buttonType="primary" loading={loading} icon={SCIArrowForward} />
      </FormItem>
    </Form>
  )
}

export default React.memo(RequestPasswordResetForm)
