import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'
import { Form, Button, Input, Tag } from 'antd'

import { Spacing } from 'components/Layout'
import { H1, Error } from 'components/Text'
import Head from 'components/Head'

import { VERIFY_RESET_PASSWORD_TOKEN, RESET_PASSWORD } from 'graphql/user'

import * as Routes from 'routes'

const Root = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
`

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.spacing.md};
  border-radius: ${(p) => p.theme.radius.sm};
  margin-top: 80px;

  @media (min-width: ${(p) => p.theme.screen.sm}) {
    width: 450px;
  }

  @media (min-width: ${(p) => p.theme.screen.md}) {
    margin-top: auto;
  }
`

/**
 * Reset password page
 */
const ResetPassword = ({ history, location, refetch }) => {
  const client = useApolloClient()
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [tokenValidity, setTokenValidity] = useState(false)
  const [error, setError] = useState('')

  const url = new URLSearchParams(location.search)
  const email = url.get('email')
  const token = url.get('token')

  useEffect(() => {
    client
      .query({
        query: VERIFY_RESET_PASSWORD_TOKEN,
        variables: { email, token },
        fetchPolicy: 'no-cache',
      })
      .then(() => setTokenValidity(true))
      .catch((gqlErrors) => {
        setError(gqlErrors)
        setTokenValidity(false)
      })
  }, [client, email, token])

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = async (values) => {
    setError('')
    return await client
      .mutate({
        mutation: RESET_PASSWORD,
        variables: { input: { email, password: values.password, token } },
      })
      .then(async ({ data }) => {
        localStorage.setItem('token', data.resetPassword.token)
        await refetch()
        history.push(Routes.HOME)
      })
      .catch((gqlErros) => setError(gqlErros))
  }

  const renderError = () => {
    let message = ''

    if (typeof error === 'string' && error) {
      message = error
    } else if (typeof error === 'object') {
      message = error.graphQLErrors[0].message
    }

    if (!tokenValidity) {
      return <Error size='sm'>{message}</Error>
    }

    return (
      <Tag visible={!!message} color='red' style={{ marginBottom: 10 }}>
        {message}
      </Tag>
    )
  }

  return (
    <Root>
      <Head title='Reset Password' />

      <Container>
        {tokenValidity ? (
          <>
            <Spacing bottom='md'>
              <H1>Password Reset</H1>
            </Spacing>

            <Form form={form} name='resetpassword' onFinish={onFinish}>
              <Form.Item
                name='password'
                hasFeedback
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Minimum password length should be 6 characters.' },
                ]}
              >
                <Input.Password placeholder=' New password' />
              </Form.Item>

              <Form.Item
                name='confirm'
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject('The two passwords that you entered do not match!')
                    },
                  }),
                ]}
              >
                <Input.Password placeholder='Confirm new password' />
              </Form.Item>

              {renderError()}

              <Form.Item shouldUpdate={true}>
                {() => (
                  <Button
                    type='primary'
                    htmlType='submit'
                    disabled={
                      !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
                    }
                  >
                    Reset Password
                  </Button>
                )}
              </Form.Item>
            </Form>
          </>
        ) : (
          <>{renderError()}</>
        )}
      </Container>
    </Root>
  )
}

ResetPassword.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default withRouter(ResetPassword)
