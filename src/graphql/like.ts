import gql from 'graphql-tag'

import { likePayload } from './types'

// *_: Queries

// DONE:
/** Get likes of selected post */
export const GET_LIKES_OF_SELECTED_POST = gql`
  query($postId: ID!) {
    getLikes(postId: $postId) {
      count
      likes {
        ${likePayload}
      }
    }
  }
`

// *_: Mutations

// DONE:
/** Create a like */
export const CREATE_LIKE = gql`
  mutation($input: CreateOrDeleteLikeInput!) {
    createLike(input: $input)
  }
`

// DONE:
/** Delete a like */
export const DELETE_LIKE = gql`
  mutation($input: CreateOrDeleteLikeInput!) {
    deleteLike(input: $input)
  }
`

// *_: Subscriptions
