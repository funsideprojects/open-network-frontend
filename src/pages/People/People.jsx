import React, { memo, Fragment } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { Transition } from 'react-spring/renderprops'

import Empty from 'components/Empty'
import HtmlHeader from 'components/Head'
import InfiniteScroll from 'components/InfiniteScroll'
import { Container } from 'components/Layout'
import { Loading } from 'components/Loading'
import Skeleton from 'components/Skeleton'
import PeopleCard from './PeopleCard'

import { PEOPLE_PAGE_USERS_LIMIT } from 'constants/DataLimit'

import { GET_USERS } from 'graphql/user'

const Root = styled(Container)`

  @media (min-width: ${(p) => p.theme.screen.lg}) {
    padding: ${(p) => p.theme.spacing.sm} !important;
  }
`

const PeopleContainer = styled.div`
  padding: ${(p) => p.theme.spacing.sm} !important;
  border-radius: ${(p) => p.theme.radius.lg};
  background: #FFF;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
  margin-bottom: ${(p) => p.theme.spacing.lg};
`

/**
 * People page
 */
const People = memo(() => {
  const queryVariables = { skip: 0, limit: PEOPLE_PAGE_USERS_LIMIT }

  return (
    <Root maxWidth='md'>
      <HtmlHeader title='Find new People' />

      <Query query={GET_USERS} variables={queryVariables} fetchPolicy='cache-and-network' notifyOnNetworkStatusChange>
        {({ data, loading, fetchMore, networkStatus }) => {
          if (loading && networkStatus === 1) {
            return (
              <PeopleContainer>
                <Skeleton height={280} count={PEOPLE_PAGE_USERS_LIMIT} />
              </PeopleContainer>
            )
          }

          if (!data.getUsers.users.length > 0) return <Empty text='No people yet.' />

          return (
            <InfiniteScroll
              queryName='getUsers'
              data={data?.getUsers?.users}
              dataKey='users'
              dataLimit={PEOPLE_PAGE_USERS_LIMIT}
              count={+data.getUsers?.count}
              variables={queryVariables}
              fetchMore={fetchMore}
            >
              {(users) => {
                const showNextLoading = loading && networkStatus === 3 && data?.getUsers?.count !== users.length

                const isNegative = Math.round(Math.random() * 1) > 0 ? '-' : ''

                return (
                  <Fragment>
                    <PeopleContainer>
                      <Transition
                        items={users}
                        keys={(user) => user.id}
                        trail={100}
                        from={{
                          opacity: 0,
                          transform: `translate3d(${isNegative}${~~(Math.random() * 30)}px, ${isNegative}${~~(
                            Math.random() * 30
                          )}px, 0)`,
                        }}
                        enter={{ opacity: 1, transform: `translate3d(0, 0, 0)` }}
                        leave={{
                          opacity: 0,
                          transform: `translate3d(${isNegative}${~~(Math.random() * 30)}px, ${isNegative}${~~(
                            Math.random() * 30
                          )}px, 0)`,
                        }}
                      >
                        {(user) => (props) => <PeopleCard key={user.id} style={props} user={user} />}
                      </Transition>
                    </PeopleContainer>

                    {showNextLoading && <Loading top='lg' />}
                  </Fragment>
                )
              }}
            </InfiniteScroll>
          )
        }}
      </Query>
    </Root>
  )
})

export default People
