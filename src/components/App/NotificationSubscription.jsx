import React, { memo, Fragment, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

import { NOTIFICATION_UPDATED } from 'graphql/notification'

const NotificationSubscription = memo(() => {
  const client = useApolloClient()

  const subscriber = client.subscribe({ query: NOTIFICATION_UPDATED }).subscribe((data) => console.log(data))

  useEffect(() => () => subscriber.unsubscribe(), [subscriber])

  return <Fragment />
})

export default NotificationSubscription
