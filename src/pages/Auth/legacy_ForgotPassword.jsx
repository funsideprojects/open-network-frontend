import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { Form, Button, Input, Tag } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import { Spacing } from 'components/Layout'
import { H1, A } from 'components/Text'
import Head from 'components/Head'

import { REQUEST_PASSWORD_RESET } from 'graphql/user'

import * as Routes from 'routes'

const Root = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
`

const Container = styled.div`
  width: 450px;
  margin: 0 auto;
  background-color: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.spacing.md};
  border-radius: ${(p) => p.theme.radius.sm};
  width: 100%;
  margin-top: 80px;

  @media (min-width: ${(p) => p.theme.screen.sm}) {
    width: 450px;
  }

  @media (min-width: ${(p) => p.theme.screen.md}) {
    margin-top: auto;
  }
`

const Text = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  line-height: 22px;
`

/**
 * Forgot password page
 */
const ForgotPassword = () => {
  const client = useApolloClient()
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [error, setError] = useState('')
  const [successMessage, setSuccessMesssage] = useState('')

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = async (values) => {
    if (!values.email) return setError('')

    setError('')
    setSuccessMesssage('')
    return await client
      .mutate({
        mutation: REQUEST_PASSWORD_RESET,
        variables: {
          input: { email: values.email },
        },
      })
      .then(async ({ data }) => {
        setError('')
        setSuccessMesssage(data.requestPasswordReset.message)
      })
      .catch((gqlErrors) => setError(gqlErrors))
  }

  const renderResponse = () => {
    let message = ''

    if (typeof error === 'string' && error) {
      message = error
    } else if (typeof error === 'object') {
      message = error.graphQLErrors[0].message
    } else if (successMessage) {
      message = successMessage
    }

    return (
      <Tag visible={!!message} color={error ? 'red' : 'green'} style={{ marginBottom: 10 }}>
        {message}
      </Tag>
    )
  }

  return (
    <Root>
      <Head title="Forgot Password" />

      <Container>
        <Spacing bottom="sm">
          <H1>Reset Password</H1>
          <Text>
            Enter the email address associated with your account, and we’ll email you a link to reset your password.
          </Text>
        </Spacing>

        <Form name="forgotpassword" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'Please input a valid email address' },
              { required: true, message: 'Please input your email address' },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          {renderResponse()}

          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Send reset link
              </Button>
            )}
          </Form.Item>

          <Spacing top="sm">
            <A to={Routes.HOME}>&larr; Back to Sign Up</A>
          </Spacing>
        </Form>
      </Container>
    </Root>
  )
}

ForgotPassword.propTypes = {
  history: PropTypes.object.isRequired,
}

export default ForgotPassword
