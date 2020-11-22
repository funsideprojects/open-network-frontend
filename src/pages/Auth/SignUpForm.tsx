import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useApolloClient } from '@apollo/client'

import { emailRegex, usernameRegex, passwordRegex, responsePrefixRegex } from 'constants/RegExr'
import { SIGN_UP } from 'graphql/user'
import { Form, FormItem, Input, Checkbox, Button, ButtonRefAttributes } from 'components/Form'
import Tag, { TagColor } from 'components/Tag'
import { ModalRefAttributes } from 'components/Modal'

import { SCIRightArrowAlt, SCICheck, SCIX } from './Generic.styled'
import FlashMessageModal from './FlashMessageModal'

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
  const { register, handleSubmit, getValues, trigger, reset, setError, errors, formState } = useForm<FormFields>({
    mode: 'onTouched',
    defaultValues: { autoSignIn: true },
    shouldFocusError: true,
  })
  const [response, setResponse] = React.useState<{ type?: TagColor; message?: string }>({
    type: undefined,
    message: undefined,
  })
  const modalRef = React.useRef<ModalRefAttributes>(null)
  const buttonRef = React.useRef<ButtonRefAttributes>(null)

  const resetResponse = () => {
    if (response.message) {
      setResponse({ type: undefined, message: undefined })
    }
  }

  const handleSignUp = async ({ confirm, autoSignIn, ...values }: FormFields) => {
    resetResponse()
    buttonRef.current?.setLoading(true)

    return await client
      .mutate({
        mutation: SIGN_UP,
        variables: {
          input: { ...values, fullName: values.fullName.trim().replace(/\s\s+/g, ' '), autoSignIn },
        },
        fetchPolicy: 'no-cache',
      })
      .then(async () => {
        if (autoSignIn) {
          await refetchAuthUser()
        } else {
          buttonRef.current?.setLoading(false)
          modalRef.current?.open()
        }
      })
      .catch((gqlError) => {
        buttonRef.current?.setLoading(false)

        const errField = gqlError.message.startsWith('__USERNAME__')
          ? 'username'
          : gqlError.message.startsWith('__EMAIL__')
          ? 'email'
          : undefined
        if (errField) {
          setError(errField, { message: gqlError.message.replace(responsePrefixRegex, '') })
        } else {
          setResponse({ type: TagColor.Error, message: gqlError.message })
        }
      })
  }

  React.useEffect(() => {
    const isAutoSignIn = getValues('autoSignIn')

    if (formState.isSubmitSuccessful && !isAutoSignIn && !response.message) {
      reset(undefined, { isSubmitted: false })
    }
  }, [formState.isSubmitSuccessful, response.message, getValues, reset])

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
      type: 'password',
      autoComplete: 'new-password',
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
        if (getValues('confirm')) {
          trigger('confirm')
        }
      },
    },
    {
      name: 'confirm',
      type: 'password',
      autoComplete: 'new-password',
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
      <FlashMessageModal modalRef={modalRef} navigate={navigate} />

      <Form
        name="sign-up-form"
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit(handleSignUp)(event)
        }}
      >
        <FormItem>
          <Tag block visible={!!response.message} tagColor={response.type}>
            {response.message}
          </Tag>
        </FormItem>

        {formItems.map((itemProps) => (
          <FormItem key={itemProps.name}>
            <Input
              {...itemProps}
              hasSuffix={itemProps.hasError ? SCIX : formState.touched[itemProps.name] ? SCICheck : undefined}
            />
          </FormItem>
        ))}

        <FormItem>
          <Checkbox name="autoSignIn" label="Sign in after registration" ref={register} />
        </FormItem>

        <FormItem top="lg">
          <Button block ref={buttonRef} type="submit" buttonType="primary" icon={SCIRightArrowAlt} />
        </FormItem>
      </Form>
    </>
  )
}

const signUpFormPropTypes = {
  refetchAuthUser: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
}

SignUpForm.propTypes = signUpFormPropTypes
type SignUpFormProps = PropTypes.InferProps<typeof signUpFormPropTypes>

export default SignUpForm
