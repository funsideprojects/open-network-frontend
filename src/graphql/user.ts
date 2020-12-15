import { gql } from '@apollo/client'

import { authUserPayload, userPayload } from './types'

// * Queries
export const VERIFY_TOKEN = gql`
  query($token: String!) {
    verifyToken(token: $token)
  }
`

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

export const GET_AUTH_USER = {
  name: 'getAuthUser',
  get gql() {
    return gql`
      query ${this.name} {
        getAuthUser {
          ${authUserPayload}
        }
      }
    `
  },
}

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

export const SUGGEST_USERS = {
  name: 'suggestUsers',
  get gql() {
    return gql`
      query ${this.name}($except: [ID]) {
        suggestUsers(except: $except) {
          id
          fullName
          username
          image
        }
      }
    `
  },
}

export const SEARCH_USERS = gql`
  query($searchQuery: String!, $skip: Int!, $limit: Int!) {
    searchUsers(searchQuery: $searchQuery, skip: $skip, limit: $limit) {
      count
      users {
        id
        fullName
        username
        image
      }
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

export const SIGN_OUT = gql`
  mutation {
    signout
  }
`

export const REQUEST_PASSWORD_RESET = gql`
  mutation($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input)
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
