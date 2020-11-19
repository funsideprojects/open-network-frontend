// ? User
export const userPayload = `
  id
  fullName
  email
  emailVerified
  username
  image
  imagePublicId
  coverImage
  coverImagePublicId
  online
  lastActiveAt

  createdAt
  updatedAt
`

// ? Comment
export const commentPayload = `
  id
  comment
  image
  imagePublicId
  stickerId
  sticker {
    image
  }
  postId
  authorId
  author {
    ${userPayload}
  }

  createdAt
  updatedAt
`

// ? Like
export const likePayload = `
  user {
    ${userPayload}
  }

  createdAt
  updatedAt
`

// ? Post
export const postPayload = `
  id
  title
  images {
    image
    imagePublicId
  }
  authorId
  isPrivate

  author {
    ${userPayload}
  }
  likeCount
  likes {
    user {
      id
      fullName
      username
      image
      imagePublicId
      isOnline
    }

    createdAt
    updatedAt
  }
  commentCount

  createdAt
  updatedAt
`

// ? Notification
export const notificationPayload = `
  id
  type
  postId
  commentId
  fromIds
  from {
    ${userPayload}
  }
  toId
  post {
    ${postPayload}
  }
  comment {
    ${commentPayload}
  }
  createdAt
  updatedAt
`
