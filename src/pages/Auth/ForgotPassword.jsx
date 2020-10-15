import React, { useState } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'
import { Form } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import { REQUEST_PASSWORD_RESET } from 'graphql/user'

import { WrapperLoading, Loading } from 'components/Loading'

import {
  Title,
  BulkHead,
  CustomLink,
  CustomForm,
  CustomInput,
  WrapperForm,
  Description,
  LoginButton,
  CustomFormItem,
  WrapperNavigation,
} from './Components'

import * as Routes from 'routes'

const NotifyCheckEmail = styled.p`
  width: 320px;
  text-align: center;
`

const TryAgain = styled.p`
  width: 320px;
  text-align: center;
  margin-bottom: 24px;
`

const HightLight = styled.span`
  color: #10a1ce;
  margin-left: 6px;
`

const EmailError = styled.span`
  color: ${(p) => p.theme.colors.error.main};
  margin-left: 6px;
`

const SendAgain = styled.span`
  color: #10a1ce;
  cursor: pointer;
  margin-left: 6px;

  &:hover {
    text-decoration: underline;
  }
`

const ForgotPassword = () => {
  const client = useApolloClient()
  const [state, setState] = useState({
    status: 'INPUT',
    email: '',
  })

  const onFinish = async (values) => {
    setState({
      status: 'SENDING',
      email: values.email,
    })

    client
      .mutate({
        mutation: REQUEST_PASSWORD_RESET,
        variables: {
          input: { email: values.email },
        },
      })
      .then(async ({ data }) => {
        setState({
          status: 'SUCCESS',
          email: values.email,
        })
      })
      .catch((gqlErrors) => {
        setState({
          status: 'ERROR',
          email: values.email,
        })
      })
  }

  const sendEmailForgotPassword = (e, email) => {
    e.persist()

    setState({
      status: 'SENDING',
      email: email ?? state.email,
    })

    client
      .mutate({
        mutation: REQUEST_PASSWORD_RESET,
        variables: {
          input: { email: email ?? state.email },
        },
      })
      .then(async ({ data }) => {
        setState({
          status: 'SUCCESS',
          email: email ?? state.email,
        })
      })
      .catch((gqlErrors) => {
        setState({
          status: 'ERROR',
          email: email ?? state.email,
        })
      })
  }

  const renderElement = {
    INPUT: (
      <>
        <Description>
          Please enter your email address. You will receive an email contains link to reset your password.
        </Description>

        <CustomForm name='normal_login' className='login-form' onFinish={onFinish}>
          <CustomFormItem
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <CustomInput
              type='email'
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email Address'
            />
          </CustomFormItem>

          <Form.Item>
            <LoginButton type='primary' htmlType='submit' className='login-form-button'>
              SEND
            </LoginButton>
          </Form.Item>
        </CustomForm>
      </>
    ),
    SUCCESS: (
      <>
        <NotifyCheckEmail>
          <span>We have sent an email to reset the password </span>
          <HightLight>{state.email}</HightLight>
          <span>. Please click the reset password link to set your new password.</span>
        </NotifyCheckEmail>
        <TryAgain>
          <span>Please check your spam folder, or</span>
          <SendAgain onClick={(e) => sendEmailForgotPassword(e)}>try again</SendAgain>
        </TryAgain>
      </>
    ),
    ERROR: (
      <>
        <NotifyCheckEmail>
          <span>Currently the system cannot send email to the address</span>
          <EmailError>{state.email}</EmailError>
        </NotifyCheckEmail>
        <TryAgain>
          <span>Not receiving password reset email?</span>
          <SendAgain onClick={(e) => sendEmailForgotPassword(e)}>Resend</SendAgain>
        </TryAgain>
      </>
    ),
    SENDING: (
      <>
        <NotifyCheckEmail>
          <span>Emails are being sent to the address </span>
          <HightLight>{state.email}</HightLight>
          <span>. Please wait...</span>
        </NotifyCheckEmail>
        <WrapperLoading>
          <Loading />
        </WrapperLoading>
      </>
    ),
  }

  return (
    <WrapperForm>
      <Title>FORGOT PASSWORD</Title>
      {renderElement[state.status]}
      <WrapperNavigation>
        <CustomLink to={Routes.HOME}>Sign In Now</CustomLink>
        <BulkHead />
        <CustomLink to={Routes.SIGN_UP}>Sign Up Now</CustomLink>
      </WrapperNavigation>
    </WrapperForm>
  )
}

export default ForgotPassword
