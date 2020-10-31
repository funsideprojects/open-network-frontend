import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Tag } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { A } from 'components/Text'

import { SIGN_IN } from 'graphql/user'

import * as Routes from 'routes'

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  width: 100%;
  font-size: ${(p) => p.theme.font.size.xxs};
  margin-top: ${(p) => p.theme.spacing.md};

  #signinform {
    width: 100%;
    flex-wrap: unset !important;
  }
`

const ErrorMessage = styled.div`
  position: absolute;
  top: 6px;
  transition: all 0.1s ease-in;
`

const ForgotPassword = styled.div`
  font-size: ${(p) => p.theme.font.size.xxs};
  color: ${(p) => p.theme.colors.white};
`

/**
 * Sign In page
 */
const SignIn = ({ history, location, refetch }) => {
  const client = useApolloClient()
  const [form] = Form.useForm()
  const [error, setError] = useState('')

  const onFinish = async (values) => {
    if (!values.emailOrUsername) return setError('Please input your username or email!')
    else if (!values.password) return setError('Please input your password!')

    setError('')
    return await client
      .mutate({
        mutation: SIGN_IN,
        variables: {
          input: values,
        },
      })
      .then(async ({ data }) => {
        setError('')
        localStorage.setItem('token', data.signin.token)
        await refetch()
        history.push(Routes.HOME)
      })
      .catch((gqlErrors) => setError(gqlErrors))
  }

  const renderError = () => {
    let message = ''

    if (typeof error === 'string' && error) {
      message = error
    } else if (typeof error === 'object') {
      message = error.graphQLErrors[0].message
    }

    return (
      <ErrorMessage style={{ opacity: message ? 1 : 0 }}>
        <Tag visible={!!message} color="red">
          {message}
        </Tag>
      </ErrorMessage>
    )
  }

  return (
    <>
      <Root>
        {renderError()}
        <Form form={form} name="signinform" layout="inline" onFinish={onFinish}>
          <Form.Item name="emailOrUsername">
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email or Username" />
          </Form.Item>

          <Form.Item name="password">
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Sign in
              </Button>
            )}
          </Form.Item>
        </Form>
      </Root>

      <A
        to={Routes.FORGOT_PASSWORD}
        style={{
          width: '57%',
          float: 'right',
        }}
      >
        <ForgotPassword>Forgot password?</ForgotPassword>
      </A>
    </>
  )
}

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default withRouter(SignIn)
