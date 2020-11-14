import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useApolloClient } from '@apollo/client'

import { emailRegex, usernameRegex, passwordRegex } from 'constants/RegExr'
import { SIGN_UP } from 'graphql/user'
import { Form, FormItem, Input, Checkbox, Button } from 'components/Form'
import { Tag } from 'components/Tag'

import { SCIRightArrowAlt, SCICheck, SCIX } from './Generic.styled'

interface FormFields {
  fullName: string
  email: string
  username: string
  password: string
  confirm: string
  autoSignIn: boolean
}

const SignUpForm = ({ refetchAuthUser }: SignUpFormProps) => {
  const client = useApolloClient()
  const { register, handleSubmit, errors, getValues, trigger, formState } = useForm<FormFields>({
    mode: 'onTouched',
    defaultValues: { autoSignIn: true },
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState<{ type?: string; message?: string }>({
    type: undefined,
    message: undefined,
  })

  const handleSignUp = async ({ confirm, autoSignIn, ...values }: FormFields) => {
    setIsLoading(true)

    return await client
      .mutate({
        mutation: SIGN_UP,
        variables: {
          input: { ...values, fullName: values.fullName.trim().replace(/\s\s+/g, ' '), autoSignIn },
        },
        fetchPolicy: 'no-cache',
      })
      .then(() => {
        if (autoSignIn) {
          refetchAuthUser()
        } else {
          setIsLoading(false)
          setResponse({ type: 'success', message: 'Congratulations, you have signed up successfully' })
        }
      })
      .catch((gqlError) => {
        setIsLoading(false)
        setResponse({ type: 'error', message: gqlError.message })
      })
  }

  const formItems = [
    {
      autoFocus: true,
      name: 'fullName',
      placeholder: 'Full name',
      ref: register({
        required: 'Full name is required',
        validate: (value) => {
          const charsCount = value.length
          if (charsCount < 1 || charsCount > 40) {
            return 'Full name cannot exceed 40 characters'
          }
        },
      }),
      hasError: errors.fullName?.message,
    },
    {
      name: 'email',
      placeholder: 'Email',
      ref: register({
        required: 'Email is required',
        pattern: {
          value: emailRegex,
          message: 'Please enter a valid email address',
        },
      }),
      hasError: errors.email?.message,
    },
    {
      name: 'username',
      placeholder: 'Username',
      ref: register({
        required: 'Username is required',
        validate: (value) => {
          const charsCount = value.length
          if (charsCount < 3) {
            return 'Minimum username length should be 3 characters'
          }
          if (charsCount > 20) {
            return 'Username cannot exceed 20 characters'
          }
        },
        pattern: {
          value: usernameRegex,
          message: 'Please enter a valid username',
        },
      }),
      hasError: errors.username?.message,
    },
    {
      name: 'password',
      autoComplete: 'on',
      type: 'password',
      placeholder: 'Password',
      ref: register({
        required: 'Password is required',
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
      }),
      hasError: errors.password?.message,
      onChange: () => {
        const confirmationValue = getValues('confirm')
        if (confirmationValue) {
          trigger('confirm')
        }
      },
    },
    {
      name: 'confirm',
      autoComplete: 'on',
      type: 'password',
      placeholder: 'Confirmation password',
      ref: register({
        required: 'Confirmation password is required',
        validate: (value) => {
          if (value !== getValues('password')) {
            return 'Your password and confirmation password is mismatch'
          }
        },
      }),
      hasError: errors.confirm?.message,
    },
  ]

  return (
    <Form name="sign-up-form" onSubmit={handleSubmit(handleSignUp)}>
      <FormItem>
        <Tag block visible={!!response.message} color={response.type}>
          {response.message}
        </Tag>
      </FormItem>

      {formItems.map((itemProps) => (
        <FormItem key={itemProps.name}>
          <Input
            {...itemProps}
            hasSuffix={formState.touched[itemProps.name] ? (itemProps.hasError ? SCIX : SCICheck) : undefined}
          />
        </FormItem>
      ))}

      <FormItem>
        <Checkbox name="autoSignIn" label="Sign in after registration" ref={register} />
      </FormItem>

      <FormItem top="lg">
        <Button block type="submit" buttonType="primary" icon={SCIRightArrowAlt} loading={isLoading}></Button>
      </FormItem>
    </Form>
  )
}

const signUpFormProps = {
  refetchAuthUser: PropTypes.func.isRequired,
}

SignUpForm.propTypes = signUpFormProps
type SignUpFormProps = PropTypes.InferProps<typeof signUpFormProps>

export default React.memo(SignUpForm)
