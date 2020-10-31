import React from 'react'
import styled from 'styled-components'
import { Query } from '@apollo/client/react/components'

import { Container } from 'components/Layout'
import { Loading } from 'components/Loading'
import Skeleton from 'components/Skeleton'
import Notification from 'components/App/Notification'
import InfiniteScroll from 'components/InfiniteScroll'
import Empty from 'components/Empty'
// import Head from 'components/Head'

import { useStore } from 'store'

import { GET_NOTIFICATION } from 'graphql/notification'

import { NOTIFICATIONS_PAGE_NOTIFICATION_LIMIT } from 'constants/DataLimit'

const WrapperNotification = styled.div`
  padding: 24px;
`

const HeaderNotification = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Root = styled(Container)`
  padding: ${(p) => p.theme.spacing.sm};
  border-radius: ${(p) => p.theme.radius.md};
  background-color: ${(p) => p.theme.colors.white};
`

const List = styled.div`
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.sm};
`

/**
 * Notifications page
 */
const Notifications = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ auth }] = useStore()

  const variables = {
    skip: 0,
    limit: NOTIFICATIONS_PAGE_NOTIFICATION_LIMIT,
  }

  return (
    <WrapperNotification>
      <Root maxWidth="md">
        <HeaderNotification>
          <span>Notifications</span>
        </HeaderNotification>

        <Query query={GET_NOTIFICATION} variables={variables} notifyOnNetworkStatusChange>
          {({ data, loading, fetchMore, networkStatus }) => {
            if (loading && networkStatus === 1) {
              return <Skeleton height={56} bottom="xxs" count={NOTIFICATIONS_PAGE_NOTIFICATION_LIMIT} />
            }

            const { notifications, count } = data?.getNotifications

            if (!notifications.length) {
              return <Empty text="No notifications yet." />
            }

            return (
              <InfiniteScroll
                data={notifications}
                dataKey="getNotifications.notifications"
                count={parseInt(count)}
                variables={variables}
                fetchMore={fetchMore}
              >
                {(data) => {
                  const showNextLoading = loading && networkStatus === 3 && count !== data.length

                  return (
                    <>
                      <List>
                        {data?.map((notification) => (
                          <Notification key={notification.id} notification={notification} close={() => false} />
                        ))}
                      </List>

                      {showNextLoading && <Loading top="lg" />}
                    </>
                  )
                }}
              </InfiniteScroll>
            )
          }}
        </Query>
      </Root>
    </WrapperNotification>
  )
}

export default Notifications
