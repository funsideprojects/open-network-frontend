import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Form } from 'antd'
import { LockOutlined } from '@ant-design/icons'

import { useApolloClient } from '@apollo/react-hooks'
import { VERIFY_RESET_PASSWORD_TOKEN, RESET_PASSWORD } from 'graphql/user'

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

const ErrorContainer = styled.div`
  height: 22px;
  text-align: center;
  color: ${(p) => p.theme.colors.err};
  margin: ${(p) => p.theme.spacing.sm};
  transition: all 0.4s;
`

const VeifyFail = styled.p`
  width: 320px;
  text-align: center;
`

const ResetPassword = ({ history, location, refetch }) => {
  const client = useApolloClient()
  const [hasError, setHasError] = useState('')
  const [state, setState] = useState({
    status: 'VERIFING',
  })

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
      .then(() => setState({ status: 'INPUT' }))
      .catch((gqlError) => {
        setState({ status: 'ERROR' })
        setHasError(gqlError.message.replace('GraphQL error: ', ''))
      })
  }, [client, email, token])

  const onFinish = async (values) => {
    client
      .mutate({
        mutation: RESET_PASSWORD,
        variables: { input: { email, password: values.password, token } },
      })
      .then(async ({ data }) => {
        localStorage.setItem('token', data.resetPassword.token)
        await refetch()
        history.push(Routes.HOME)
      })
      .catch(() => setState({ status: 'ERROR' }))
  }

  const renderElement = {
    INPUT: (
      <>
        <Description>You will get redirected to the homepage after your password successfully resetted</Description>

        <CustomForm name='normal_login' className='login-form' onFinish={onFinish}>
          <ErrorContainer>{hasError}</ErrorContainer>

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
              type='password'
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Password'
            />
          </CustomFormItem>
          <CustomFormItem
            name='confirm'
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
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
              type='password'
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Confirm Password'
            />
          </CustomFormItem>

          <Form.Item>
            <LoginButton type='primary' htmlType='submit' className='login-form-button'>
              RESET
            </LoginButton>
          </Form.Item>
        </CustomForm>
      </>
    ),
    ERROR: (
      <VeifyFail>
        <span>Authentication failed. Your token is invalid or expired</span>
      </VeifyFail>
    ),
    VERIFING: (
      <>
        <VeifyFail>
          <span>Your token is being verified</span>
        </VeifyFail>
        <WrapperLoading>
          <Loading />
        </WrapperLoading>
      </>
    ),
  }

  return (
    <WrapperForm>
      <Title>RESET PASSWORD</Title>
      {renderElement[state.status]}
      <WrapperNavigation>
        <CustomLink to={Routes.HOME}>Sign In Now</CustomLink>
        <BulkHead />
        <CustomLink to={Routes.SIGN_UP}>Sign Up Now</CustomLink>
      </WrapperNavigation>
    </WrapperForm>
  )
}

ResetPassword.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default withRouter(ResetPassword)
