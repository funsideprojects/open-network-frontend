import { gql } from '@apollo/client'

import { userPayload } from './types'

// * Queries
export const GET_FOLLOWING_IDS = {
  name: 'getFollowingIds',
  get gql() {
    return gql`
      query ${this.name}($input: GetFollowingOrFollowerInput!) {
        getFollowings(input: $input) {
          users {
            id
          }
        }
      }
    `
  },
}

export const GET_FOLLOWINGS = {
  name: 'getFollowings',
  get gql() {
    return gql`
      query ${this.name}($input: GetFollowingOrFollowerInput!) {
        getFollowings(input: $input) {
          count
          users {
            ${userPayload}
          }
        }
      }
    `
  },
}

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

// * Mutations

export const CREATE_FOLLOW = gql`
  mutation($input: CreateOrDeleteFollowInput!) {
    createFollow(input: $input)
  }
`

export const DELETE_FOLLOW = gql`
  mutation($input: CreateOrDeleteFollowInput!) {
    deleteFollow(input: $input)
  }
`

// * Subscriptions
