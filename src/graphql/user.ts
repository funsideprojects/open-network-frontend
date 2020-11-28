import { gql } from '@apollo/client'

import { authUserPayload, userPayload } from './types'

// * Queries

export const GET_CONVERSATIONS = gql`
  query($authUserId: ID!) {
    getConversations(authUserId: $authUserId) {
      id
      username
      fullName
      image
      online
      seen
      lastMessage
      lastMessageSender
      lastMessageCreatedAt
    }
  }
`

export const GET_AUTH_USER = gql`
  query getAuthUser {
    getAuthUser {
      ${authUserPayload}
    }
  }
`

export const GET_USER = gql`
  query getUser($username: String, $id: ID) {
    getUser(username: $username, id: $id) {
      ${userPayload}
    }
  }
`

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

// * Mutations

export const SIGN_UP = gql`
  mutation($input: SignUpInput!) {
    signup(input: $input)
  }
`

export const SIGN_IN = gql`
  mutation($input: SignInInput!) {
    signin(input: $input)
  }
`

export const REQUEST_PASSWORD_RESET = gql`
  mutation($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input)
  }
`

export const VERIFY_TOKEN = gql`
  query($token: String!) {
    verifyToken(token: $token)
  }
`

export const RESET_PASSWORD = gql`
  mutation($input: ResetPasswordInput!) {
    resetPassword(input: $input)
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

// * Subscriptions

// DONE:
/** Check if user is online in real time */
export const IS_USER_ONLINE_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    isUserOnline(userId: $userId) {
      userId
      online
      lastActiveAt
    }
  }
`
