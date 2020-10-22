import gql from 'graphql-tag'

import { userPayload } from './types'

// * Queries

/** Get users with whom authUser had a conversation */
export const GET_CONVERSATIONS = gql`
  query($authUserId: ID!) {
    getConversations(authUserId: $authUserId) {
      id
      username
      fullName
      image
      isOnline
      seen
      lastMessage
      lastMessageSender
      lastMessageCreatedAt
    }
  }
`
// DONE:
/** Get authenticated user */
export const GET_AUTH_USER = gql`
  query getAuthUser {
    getAuthUser {
      ${userPayload}
    }
  }
`

// DONE:
/** Get specific user by username */
export const GET_USER = gql`
  query getUser($username: String, $id: ID) {
    getUser(username: $username, id: $id) {
      ${userPayload}
    }
  }
`

// DONE:
/** Get all available users */
export const GET_USERS = gql`
  query($skip: Int, $limit: Int) {
    getUsers(skip: $skip, limit: $limit) {
      count
      users {
        ${userPayload}
      }
    }
  }
`

// DONE:
/** People suggestions for auth user */
export const USER_SUGGESTIONS = gql`
  query suggestPeople {
    suggestPeople {
      id
      fullName
      username
      image
    }
  }
`
// DONE:
/** Search users by username or fullName */
export const SEARCH_USERS = gql`
  query($searchQuery: String!) {
    searchUsers(searchQuery: $searchQuery) {
      id
      fullName
      username
      image
    }
  }
`

// *_: Mutations

// DONE:
/** Sign up user */
export const SIGN_UP = gql`
  mutation($input: SignUpInput!) {
    signup(input: $input) {
      token
    }
  }
`

// DONE:
/** Sign in user */
export const SIGN_IN = gql`
  mutation($input: SignInInput!) {
    signin(input: $input) {
      token
    }
  }
`

// DONE:
/** Request reset password */
export const REQUEST_PASSWORD_RESET = gql`
  mutation($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      message
    }
  }
`

// DONE:
/** Verify reset password token */
export const VERIFY_RESET_PASSWORD_TOKEN = gql`
  query($email: String!, $token: String!) {
    verifyResetPasswordToken(email: $email, token: $token) {
      message
    }
  }
`

// DONE:
/** Reset password */
export const RESET_PASSWORD = gql`
  mutation($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      token
    }
  }
`

// DONE:
/** Upload user photo */
export const UPDATE_USER_PHOTO = gql`
  mutation($input: UpdateUserPhotoInput!) {
    updateUserPhoto(input: $input) {
      image
    }
  }
`

// *_: Subscriptions

// DONE:
/** Check if user is online in real time */
export const IS_USER_ONLINE_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    isUserOnline(userId: $userId) {
      userId
      isOnline
      lastActiveAt
    }
  }
`
