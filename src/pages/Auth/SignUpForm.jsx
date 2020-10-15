import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Form } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, FileTextOutlined } from '@ant-design/icons'

import { useApolloClient } from '@apollo/react-hooks'

import { SIGN_UP } from 'graphql/user'

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

const SignUpForm = ({ history, refetch }) => {
  const client = useApolloClient()
  const [hasError, setHasError] = useState('')

  const onFinish = async ({ confirm, ...values }) => {
    return await client
      .mutate({
        mutation: SIGN_UP,
        variables: {
          input: values,
        },
        fetchPolicy: 'no-cache',
      })
      .then(async ({ data }) => {
        localStorage.setItem('token', data.signup.token)
        await refetch()
        history.push(Routes.HOME)
      })
      .catch((gqlError) => setHasError(gqlError.message.replace('GraphQL error: ', '')))
  }

  return (
    <WrapperForm>
      <Title>SIGN UP</Title>

      <CustomForm name='normal_login' className='login-form' onFinish={onFinish}>
        <ErrorContainer>{hasError}</ErrorContainer>

        <CustomFormItem
          name='fullName'
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <CustomInput prefix={<FileTextOutlined className='site-form-item-icon' />} placeholder='Fullname' />
        </CustomFormItem>

        <CustomFormItem
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <CustomInput type='email' prefix={<MailOutlined className='site-form-item-icon' />} placeholder='Email' />
        </CustomFormItem>
        <CustomFormItem
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <CustomInput prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
        </CustomFormItem>
        <CustomFormItem
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <CustomInput
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </CustomFormItem>
        <CustomFormItem
          name='confirm'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
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
          <CustomInput
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Confirm Password'
          />
        </CustomFormItem>
        <Form.Item>
          <LoginButton type='primary' htmlType='submit' className='login-form-button'>
            SIGN UP
          </LoginButton>
        </Form.Item>
      </CustomForm>
      <WrapperNavigation>
        <span>Do have an Account? </span>
        <CustomLink to={Routes.HOME}>Sign In Now</CustomLink>
      </WrapperNavigation>
    </WrapperForm>
  )
}

SignUpForm.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default withRouter(SignUpForm)
