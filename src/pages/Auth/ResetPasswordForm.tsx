import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { passwordRegex, responsePrefixRegex } from 'constants/RegExr'
import { VERIFY_TOKEN, RESET_PASSWORD } from 'graphql/user'
import { Form, FormItem, Input, Button } from 'components/Form'
import Loading from 'components/Loading'
import Tag, { TagColor } from 'components/Tag'

import * as Routes from 'routes'

import { Title, Paragraphs, SCICheck, SCIX, SCIRightArrowAlt } from './Generic.styled'

type RouteState = { succeeded?: boolean }
type RouteParams = { token?: string }
interface FormFields {
  password: string
  confirm: string
}

const ResetPasswordForm = ({ navigate }: ResetPasswordFormProps) => {
  const history = useHistory<RouteState>()
  const { token } = useParams<RouteParams>()
  const { loading: tokenIsBeingValidating, data: verificationResult } = useQuery(VERIFY_TOKEN, {
    variables: { token },
    fetchPolicy: 'no-cache',
  })

  const [resetPassword, { loading: processingPasswordReset }] = useMutation(RESET_PASSWORD)
  const { register, handleSubmit, getValues, trigger, setError, errors, formState } = useForm<FormFields>({
    mode: 'onTouched',
    shouldFocusError: true,
  })

  const [response, setResponse] = React.useState<{ type?: TagColor; message?: string }>({
    type: undefined,
    message: undefined,
  })

  const handleResetPassword = async (values: FormFields) => {
    if (response.message) {
      setResponse({ type: undefined, message: undefined })
    }

    return await resetPassword({ variables: { input: { token, password: values.password } } })
      .then(() => {
        history.replace(Routes.RESET_PASSWORD, { succeeded: true })
      })
      .catch((gqlError) => {
        if (gqlError.message.startsWith('__INPUT__')) {
          setError('password', { message: gqlError.message.replace(responsePrefixRegex, '') })
        } else {
          setResponse({ type: TagColor.Error, message: gqlError.message })
        }
      })
  }

  React.useEffect(() => {
    if (!token && !history.location.state?.succeeded) {
      history.replace(Routes.HOME)
    }
  }, [token, history])

  if (history.location.state?.succeeded) {
    return (
      <>
        <Title>Congratulation</Title>

        <Tag block visible tagColor={TagColor.Success}>
          Password changed successfully! You can now sign in with your new password
        </Tag>

        <FormItem top="md">
          <Button block buttonType="primary" onClick={() => navigate(Routes.SIGN_IN)}>
            SIGN IN
          </Button>
        </FormItem>
      </>
    )
  }

  if (tokenIsBeingValidating) {
    return (
      <>
        <Title>Verifying your token...</Title>
        <Loading block radiusBorder />
      </>
    )
  }

  if (!verificationResult?.verifyPasswordResetToken) {
    return (
      <>
        <Title>Ooops!!</Title>
        <Tag visible block tagColor={TagColor.Error}>
          This token is either invalid or expired
        </Tag>
      </>
    )
  }

  return (
    <>
      <Title>Set your new password</Title>

      <Paragraphs noMargin>
        Please enter a new password with at least 6 characters, <br />
        including only word, digit and allowed special character(!, @, #, $, %, ^, &, *)
      </Paragraphs>

      <Form
        name="reset-password-form"
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit(handleResetPassword)(event)
        }}
      >
        <FormItem>
          <Input
            autoFocus
            name="password"
            type="password"
            autoComplete="on"
            placeholder="New password"
            ref={register({
              required: 'New password is required',
              validate: (value) => {
                const charsCount = value.length
                if (charsCount < 6) {
                  return 'Minimum password length should be 6 characters'
                }
              },
              pattern: {
                value: passwordRegex,
                message: 'Password only accept word, digit and certain types of special characters',
              },
            })}
            hasSuffix={errors.password ? SCIX : formState.touched.password ? SCICheck : undefined}
            hasError={errors.password?.message}
            onChange={() => {
              if (getValues('confirm')) {
                trigger('confirm')
              }
            }}
          />
        </FormItem>

        <FormItem>
          <Input
            name="confirm"
            type="password"
            autoComplete="on"
            placeholder="Confirmation password"
            ref={register({
              required: 'Confirmation password is required',
              validate: (value) => {
                if (value !== getValues('password')) {
                  return 'Your password and confirmation password is mismatch'
                }
              },
            })}
            hasSuffix={errors.confirm ? SCIX : formState.touched.confirm ? SCICheck : undefined}
            hasError={errors.confirm?.message}
          />
        </FormItem>

        <FormItem top="sm">
          <Tag block visible={!!response.message} tagColor={response.type}>
            {response.message}
          </Tag>
        </FormItem>

        <FormItem top="xs">
          <Button block type="submit" buttonType="primary" loading={processingPasswordReset} icon={SCIRightArrowAlt} />
        </FormItem>
      </Form>
    </>
  )
}

const resetPasswordFormPropTypes = {
  navigate: PropTypes.func.isRequired,
}

ResetPasswordForm.propTypes = resetPasswordFormPropTypes
type ResetPasswordFormProps = PropTypes.InferProps<typeof resetPasswordFormPropTypes>

export default ResetPasswordForm
