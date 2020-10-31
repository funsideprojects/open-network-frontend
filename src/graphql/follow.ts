import { gql } from '@apollo/client'

import { userPayload } from './types'

// *_: Queries

// DONE:
/**
 * Get followed users of selected user
 * - If there's no username, then get followed users of authenticated user
 */
export const GET_FOLLOWED_USERS = gql`
  query getFollowedUsers($username: String, $skip: Int, $limit: Int) {
    getFollowedUsers(username: $username, skip: $skip, limit: $limit) {
      count
      users {
        ${userPayload}
      }
    }
  }
`

// DONE:
/** Get user's followers */
export const GET_USER_FOLLOWERS = gql`
  query($username: String) {
    getUserFollowers(username: $username) {
      count
    }
  }
`

// DONE:
/** Get the number of user that selected user is following */
export const GET_FOLLOWED_USERS_COUNT = gql`
  query($username: String) {
    getFollowedUsers(username: $username) {
      count
    }
  }
`

// *_: Mutations

// DONE:
/** Follow selected user */
export const CREATE_FOLLOW = gql`
  mutation($input: CreateOrDeleteFollowInput!) {
    createFollow(input: $input)
  }
`

// DONE:
/** Unfollow selected user */
export const DELETE_FOLLOW = gql`
  mutation($input: CreateOrDeleteFollowInput!) {
    deleteFollow(input: $input)
  }
`

// *_: Subscriptions
