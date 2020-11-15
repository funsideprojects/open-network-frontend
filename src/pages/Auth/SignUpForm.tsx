import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useApolloClient } from '@apollo/client'

import { emailRegex, usernameRegex, passwordRegex } from 'constants/RegExr'
import { SIGN_UP } from 'graphql/user'
import { Form, FormItem, Input, Checkbox, Button } from 'components/Form'
import Tag, { TagColor } from 'components/Tag'
import { ExposedModalValues } from 'components/Modal'

import { SCIRightArrowAlt, SCICheck, SCIX } from './Generic.styled'
import ModalFlashMessage from './ModalFlashMessage'

interface FormFields {
  fullName: string
  email: string
  username: string
  password: string
  confirm: string
  autoSignIn: boolean
}

const SignUpForm = ({ refetchAuthUser, navigate }: SignUpFormProps) => {
  const client = useApolloClient()
  const { register, handleSubmit, errors, getValues, trigger, reset, formState } = useForm<FormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: 'Ovrx',
      email: 'ovrx@mail.os',
      username: 'ovrx',
      password: 'asdasd',
      confirm: 'asdasd',
      autoSignIn: true,
    },
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState<{ type?: TagColor; message?: string }>({
    type: undefined,
    message: undefined,
  })
  const modalRef = React.useRef<ExposedModalValues>(null)

  const handleSignUp = async ({ confirm, autoSignIn, ...values }: FormFields) => {
    setResponse({ type: undefined, message: undefined })
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
          reset(
            {},
            {
              errors: false,
              touched: false,
              isDirty: false,
              isValid: false,
              isSubmitted: false,
              dirtyFields: false,
              submitCount: false,
            }
          )
          modalRef.current?.open()
        }
      })
      .catch((gqlError) => {
        setIsLoading(false)
        setResponse({ type: TagColor.Error, message: gqlError.message })
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
    <>
      <ModalFlashMessage modalRef={modalRef} navigate={navigate} />

      <Form name="sign-up-form" onSubmit={handleSubmit(handleSignUp)}>
        <FormItem>
          <Tag block visible={!!response.message} tagColor={response.type}>
            {response.message}
          </Tag>
        </FormItem>

        {formItems.map((itemProps) => (
          <FormItem key={itemProps.name}>
            <Input
              {...itemProps}
              hasSuffix={itemProps.hasError ? SCIX : formState.errors[itemProps.name] ? SCICheck : undefined}
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
    </>
  )
}

const signUpFormProps = {
  refetchAuthUser: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
}

SignUpForm.propTypes = signUpFormProps
type SignUpFormProps = PropTypes.InferProps<typeof signUpFormProps>

export default React.memo(SignUpForm)
