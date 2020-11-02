import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Form } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { useApolloClient } from '@apollo/client'

import { SIGN_IN } from 'graphql/user'

import { Input, Checkbox, Button } from 'components/Form/index'

import * as Routes from 'routes'

const StyledForm = styled(Form)``

const SignInForm = ({ refetch }) => {
  const history = useHistory()
  const client = useApolloClient()
  const [hasError, setHasError] = useState('')

  const handleSignIn = (values) => {
    client
      .mutate({
        mutation: SIGN_IN,
        variables: {
          input: values,
        },
      })
      .then(async ({ data }) => {
        await refetch()
        history.push(Routes.HOME)
      })
      .catch((gqlError) => {
        setHasError(gqlError.message.replace('GraphQL error: ', ''))
      })
  }

  return (
    <Form name="sign-in-form" initialValues={{ remember: true }} onFinish={handleSignIn}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username' }]}>
        <Input prefix={<UserOutlined />} placeholder="Username" bordered={false} size="large" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password' }]}>
        <Input.Password placeholder="Password" autoComplete="on" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  )
}

SignInForm.propTypes = {
  history: PropTypes.object.isRequired,
  refetchAuthUser: PropTypes.func.isRequired,
}

export default SignInForm
