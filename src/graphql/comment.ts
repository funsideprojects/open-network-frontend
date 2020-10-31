import { gql } from '@apollo/client'

import { commentPayload } from './types'

// *_: Queries

// DONE:
/** Get comments of selected post */
export const GET_COMMENTS_OF_SELECTED_POST = gql`
  query getCommentsOfSelectedPost($postId: ID!, $skip: Int, $limit: Int) {
    getComments(postId: $postId, skip: $skip, limit: $limit) {
      count
      comments {
        ${commentPayload}
      }
    }
  }
`

// *_: Mutations

// DONE:
/** Create a comment */
export const CREATE_COMMENT = gql`
  mutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`

// DONE:
/** Update a comment */
export const UPDATE_COMMENT = gql`
  mutation($input: UpdateCommentInput!) {
    updateComment(input: $input)
  }
`

// DONE:
/** Delete a comment */
export const DELETE_COMMENT = gql`
  mutation($input: DeleteCommentInput!) {
    deleteComment(input: $input)
  }
`

// *_: Subscriptions
