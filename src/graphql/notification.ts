import { gql } from '@apollo/client'

import { notificationPayload } from './types'

/**
 * Creates a notification for user
 */
export const CREATE_NOTIFICATION = gql`
  mutation($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      id
    }
  }
`

/**
 * Deletes a notification
 */
export const DELETE_NOTIFICATION = gql`
  mutation($input: DeleteNotificationInput!) {
    deleteNotification(input: $input) {
      id
    }
  }
`

/**
 * Gets notifications for user
 */
export const GET_NOTIFICATION = gql`
  query($skip: Int, $limit: Int) {
    getNotifications(skip: $skip, limit: $limit) {
      count
      unseen
      notifications {
        ${notificationPayload}
      }
    }
  }
`

/**
 * Updates notification seen property
 */
export const UPDATE_NOTIFICATION_SEEN = gql`
  mutation($input: UpdateNotificationSeenInput!) {
    updateNotificationSeen(input: $input)
  }
`

export const NOTIFICATION_UPDATED = gql`
  subscription {
    notificationUpdated {
      operation
    }
  }
`
