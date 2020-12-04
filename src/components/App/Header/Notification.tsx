import React from 'react'
import { useSubscription } from '@apollo/client'
import { Notifications } from '@styled-icons/ionicons-outline/Notifications'

import { SCISpinner } from 'components/Loading'
import { NOTIFICATION_UPDATED } from 'graphql/notification'

import * as Routes from 'routes'

import { Link } from './Header.styled'

const Notification = () => {
  // todo - replace loading by query
  const { loading } = useSubscription(NOTIFICATION_UPDATED, {
    onSubscriptionData(data) {
      console.log(data)
    },
  })

  return (
    <Link to={Routes.NOTIFICATIONS} activeClassName="is-active" count={!loading ? 0 : 1501}>
      {!loading ? <SCISpinner /> : <Notifications />}
    </Link>
  )
}

export default Notification
