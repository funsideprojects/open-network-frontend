import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from 'antd'
import { withRouter } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { useApolloClient } from '@apollo/client'

import { SIGN_IN } from 'graphql/user'

import * as Routes from 'routes'

import {
  Title,
  CustomLink,
  CustomForm,
  LoginButton,
  CustomInput,
  WrapperForm,
  CustomFormItem,
  WrapperNavigation,
} from './Components'

const ErrorContainer = styled.div`
  height: 22px;
  text-align: center;
  color: ${(p) => p.theme.colors.err};
  margin: ${(p) => p.theme.spacing.sm};
  transition: all 0.4s;
`

const SignInForm = ({ history, refetch }) => {
  const client = useApolloClient()
  const [hasError, setHasError] = useState('')

  const onFinish = async (values) => {
    return await client
      .mutate({
        mutation: SIGN_IN,
        variables: {
          input: values,
        },
      })
      .then(async ({ data }) => {
        // localStorage.setItem('token', data.signin)
        await refetch()
        history.push(Routes.HOME)
      })
      .catch((gqlError) => {
        setHasError(gqlError.message.replace('GraphQL error: ', ''))
      })
  }

  return (
    <WrapperForm>
      <Title>SIGN IN</Title>

      <CustomForm
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <ErrorContainer>{hasError}</ErrorContainer>

        <CustomFormItem
          name="emailOrUsername"
          rules={[
            {
              required: true,
              message: 'Please input your Email or Username!',
            },
          ]}
        >
          <CustomInput prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email or Username" />
        </CustomFormItem>
        <CustomFormItem
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <CustomInput
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            autoComplete="on"
          />
        </CustomFormItem>
        <CustomFormItem>
          <CustomLink to={Routes.FORGOT_PASSWORD}>Forgot password</CustomLink>
        </CustomFormItem>

        <Form.Item>
          <LoginButton type="primary" htmlType="submit" className="login-form-button">
            SIGN IN
          </LoginButton>
        </Form.Item>
      </CustomForm>
      <WrapperNavigation>
        <span>Don't have an Account? </span>
        <CustomLink to={Routes.SIGN_UP}>Sign Up Now</CustomLink>
      </WrapperNavigation>
    </WrapperForm>
  )
}

SignInForm.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default withRouter(SignInForm)
