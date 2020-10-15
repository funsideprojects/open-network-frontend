import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Tag } from 'antd'
import { useApolloClient } from '@apollo/react-hooks'

import { Spacing, Container } from 'components/Layout'
import { H1 } from 'components/Text'
import Head from 'components/Head'

import { SIGN_UP } from 'graphql/user'

import * as Routes from 'routes'

const Root = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    justify-content: space-between;
    margin-top: 120px;
  }
`

const Welcome = styled.div`
  display: none;
  flex-direction: column;
  color: ${(p) => p.theme.colors.white};
  max-width: ${(p) => p.theme.screen.xs};

  @media (min-width: ${(p) => p.theme.screen.md}) {
    display: flex;
  }
`

const Heading = styled(H1)`
  margin-bottom: ${(p) => p.theme.spacing.sm};
`

const FormContainer = styled.div`
  padding: ${(p) => p.theme.spacing.md};
  border-radius: ${(p) => p.theme.radius.sm};
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;

  @media (min-width: ${(p) => p.theme.screen.sm}) {
    width: 450px;
  }
`

/**
 * Sign Up page
 */
const SignUp = ({ history, refetch }) => {
  const client = useApolloClient()
  const [error, setError] = useState('')

  const onFinish = async ({ confirm, ...values }) => {
    setError('')
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
      <Tag visible={!!message} color='red'>
        {message}
      </Tag>
    )
  }

  return (
    <Root maxWidth='lg'>
      <Head />

      <Welcome>
        <div>
          <Heading color='white'>Connect with friends and the world around you.</Heading>
        </div>

        <p>See photos and updates from your friends.</p>
        <p>Follow your interests.</p>
        <p>Hear what people are talking about.</p>
      </Welcome>

      <FormContainer>
        <Spacing bottom='md'>
          <H1>Sign Up</H1>
        </Spacing>

        <Form name='signupform' onFinish={onFinish}>
          <Form.Item
            name='fullName'
            rules={[
              { required: true, whitespace: true, message: 'Please input your full name!' },
              { min: 4, max: 40, message: 'Full name length should be between 4-40 characters.' },
            ]}
          >
            <Input placeholder='Full name' />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address.' },
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item
            name='username'
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, max: 20, message: 'Username length should be between 3-20 characters.' },
              {
                pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
                message: 'Usernames can only use letters, numbers, underscores and periods.',
              },
            ]}
          >
            <Input placeholder='Username' />
          </Form.Item>

          <Form.Item
            name='password'
            hasFeedback
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Minimum password length should be 6 characters.' },
            ]}
          >
            <Input.Password placeholder='Password' />
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
            <Input.Password placeholder='Confirm password' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Complete
            </Button>
          </Form.Item>
        </Form>

        {renderError()}
      </FormContainer>
    </Root>
  )
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default withRouter(SignUp)
