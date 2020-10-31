import { gql } from '@apollo/client'

import { postPayload, commentPayload } from './types'

// *_: Queries

// DONE:
/** Get all posts from followed users */
export const GET_POSTS_FROM_FOLLOWED_USERS = gql`
  query getPostsFromFollowedUsers($skip: Int, $limit: Int) {
    getPosts(type: FOLLOWED, skip: $skip, limit: $limit) {
      count
      posts {
        ${postPayload}
      }
    }
  }
`

// DONE:
/** Get selected user's posts */
export const GET_USER_POSTS = gql`
  query getUserPosts($username: String!, $skip: Int, $limit: Int) {
    getPosts(type: USER, username: $username, skip: $skip, limit: $limit) {
      count
      posts {
        ${postPayload}
      }
    }
  }
`

// DONE:
/** Get the number of post created by selected user */
export const GET_USER_POSTS_COUNT = gql`
  query($username: String!) {
    getPosts(type: USER, username: $username) {
      count
    }
  }
`

// DONE:
/** Get specific post by postId */
export const GET_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      ${postPayload}
      comments {
        ${commentPayload}
      }
    }
  }
`

// DONE:
/** Explore posts */
export const EXPLORE_POSTS = gql`
  query explorePosts($skip: Int, $limit: Int) {
    getPosts(type: EXPLORE, skip: $skip, limit: $limit) {
      count
      posts {
        ${postPayload}
      }
    }
  }
`

// *_: Mutations

// DONE:
/** Creates a post */
export const CREATE_POST = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`

// DONE:
/** Update a post */
export const UPDATE_POST = gql`
  mutation($input: UpdatePostInput!) {
    updatePost(input: $input)
  }
`

// DONE:
/** Delete a post */
export const DELETE_POST = gql`
  mutation($input: DeletePostInput!) {
    deletePost(input: $input)
  }
`

// *_: Subscriptions
