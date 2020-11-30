import React from 'react'
import { useApolloClient } from '@apollo/client'

import { NOTIFICATION_UPDATED } from 'graphql/notification'

const Notification = () => {
  const client = useApolloClient()

  React.useEffect(() => {
    const observer = client.subscribe({ query: NOTIFICATION_UPDATED })
    const subscription = observer.subscribe((data) => console.log(data))

    return () => subscription.unsubscribe()
  }, [client])

  return <React.Fragment />
}

export default Notification
